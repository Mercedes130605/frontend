import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Pelicula } from '../../models/models';

@Component({
    selector: 'app-admin-movies',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-movies.component.html',
    styleUrls: ['./admin-movies.component.css']
})
export class AdminMoviesComponent implements OnInit {
    private movieService = inject(MovieService);
    peliculas: Pelicula[] = [];
    mostrarFormulario = false;
    editando = false;
    peliculaEditId: number | null = null;
    nuevaPelicula: any = {};

    ngOnInit() {
        this.cargarPeliculas();
    }

    cargarPeliculas() {
        this.movieService.getPeliculas().subscribe((res: any) => {
            this.peliculas = res;
        });
    }

    abrirFormularioCrear() {
        this.editando = false;
        this.peliculaEditId = null;
        this.nuevaPelicula = {};
        this.mostrarFormulario = true;
    }

    editarPelicula(pelicula: Pelicula) {
        this.editando = true;
        this.peliculaEditId = pelicula.id;
        this.nuevaPelicula = { ...pelicula };
        this.mostrarFormulario = true;
    }

    guardarPelicula() {
        if (this.editando && this.peliculaEditId) {
            this.movieService.actualizarPelicula(this.peliculaEditId, this.nuevaPelicula).subscribe(() => {
                this.cargarPeliculas();
                this.mostrarFormulario = false;
                this.nuevaPelicula = {};
                this.editando = false;
            });
        } else {
            this.movieService.crearPelicula(this.nuevaPelicula).subscribe(() => {
                this.cargarPeliculas();
                this.mostrarFormulario = false;
                this.nuevaPelicula = {};
            });
        }
    }

    eliminarPelicula(id: number) {
        if (confirm('¿Eliminar esta película?')) {
            this.movieService.eliminarPelicula(id).subscribe(() => {
                this.cargarPeliculas();
            });
        }
    }
}