import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Pelicula, Horario } from '../../models/models';

@Component({
    selector: 'app-movie-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private movieService = inject(MovieService);
    
    pelicula = signal<Pelicula | null>(null);
    horarios = signal<Horario[]>([]);

    ngOnInit() {
        const id = Number(this.route.snapshot.params['id']);
        this.cargarPelicula(id);
        this.cargarHorarios(id);
    }

    cargarPelicula(id: number) {
        this.movieService.getPelicula(id).subscribe({
            next: (res: any) => this.pelicula.set(res)
        });
    }

    cargarHorarios(peliculaId: number) {
        this.movieService.getHorarios(peliculaId).subscribe({
            next: (res: any) => this.horarios.set(res)
        });
    }
}