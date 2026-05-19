import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Pelicula, Horario } from '../../models/models';

@Component({
    selector: 'app-admin-schedules',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-schedules.component.html',
    styleUrls: ['./admin-schedules.component.css']
})
export class AdminSchedulesComponent implements OnInit {
    private movieService = inject(MovieService);
    peliculas: Pelicula[] = [];
    horarios = signal<Horario[]>([]);
    nuevaPeliculaSeleccionada = 0;
    nuevoHorario: any = {};

    ngOnInit() {
        this.cargarPeliculas();
    }

    cargarPeliculas() {
        this.movieService.getPeliculas().subscribe((res: any) => {
            this.peliculas = res;
            if (res.length > 0) {
                this.nuevaPeliculaSeleccionada = res[0].id;
                this.cargarHorarios(res[0].id);
            }
        });
    }

    cargarHorarios(peliculaId: number) {
        this.movieService.getHorarios(peliculaId).subscribe((res: any) => {
            this.horarios.set(res);
        });
    }

    onPeliculaChange(event: Event) {
        const select = event.target as HTMLSelectElement;
        this.cargarHorarios(Number(select.value));
    }

    agregarHorario() {
        this.nuevoHorario.pelicula_id = this.nuevaPeliculaSeleccionada;
        this.movieService.crearHorario(this.nuevoHorario).subscribe(() => {
            alert('Horario creado exitosamente');
            this.cargarHorarios(this.nuevaPeliculaSeleccionada);
            this.nuevoHorario = {};
        });
    }

    eliminarHorario(id: number) {
        if (confirm('¿Eliminar este horario?')) {
            // Aquí iría la llamada al backend para eliminar horario
            alert('Funcionalidad en desarrollo');
        }
    }
}