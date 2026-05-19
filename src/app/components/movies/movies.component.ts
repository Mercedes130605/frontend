import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';
import { Pelicula } from '../../models/models';

@Component({
    selector: 'app-movies',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
    private movieService = inject(MovieService);
    public auth = inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    
    peliculasOriginal = signal<Pelicula[]>([]);
    peliculasFiltradas = signal<Pelicula[]>([]);
    terminoBusqueda = '';

    ngOnInit() {
        this.cargarPeliculas();
        
        this.route.queryParams.subscribe(params => {
            if (params['search']) {
                this.terminoBusqueda = params['search'];
                this.buscarPeliculas();
            }
        });
    }

    cargarPeliculas() {
        this.movieService.getPeliculas().subscribe({
            next: (res: any) => {
                this.peliculasOriginal.set(res);
                this.peliculasFiltradas.set(res);
            },
            error: (err) => console.error(err)
        });
    }

    buscarPeliculas() {
        const termino = this.terminoBusqueda.toLowerCase().trim();
        
        if (termino === '') {
            this.peliculasFiltradas.set(this.peliculasOriginal());
            return;
        }
        
        const filtradas = this.peliculasOriginal().filter(pelicula => 
            pelicula.titulo.toLowerCase().includes(termino) ||
            pelicula.genero.toLowerCase().includes(termino) ||
            pelicula.descripcion.toLowerCase().includes(termino)
        );
        
        this.peliculasFiltradas.set(filtradas);
    }
}