import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Pelicula, PeliculaRequest, Horario, HorarioRequest, Asiento } from '../models/models';
import { config } from '../config';

@Injectable({ providedIn: 'root' })
export class MovieService {
    private http = inject(HttpClient);
    private auth = inject(AuthService);
    private apiUrl = config.apiUrl;

    // Películas
    getPeliculas() {
        return this.http.get<Pelicula[]>(`${this.apiUrl}/peliculas`);
    }

    getPelicula(id: number) {
        return this.http.get<Pelicula>(`${this.apiUrl}/peliculas/${id}`);
    }

    crearPelicula(pelicula: PeliculaRequest) {
        return this.http.post(`${this.apiUrl}/peliculas`, pelicula, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    actualizarPelicula(id: number, pelicula: PeliculaRequest) {
        return this.http.put(`${this.apiUrl}/peliculas/${id}`, pelicula, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    eliminarPelicula(id: number) {
        return this.http.delete(`${this.apiUrl}/peliculas/${id}`, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    // Horarios
    getHorarios(peliculaId: number) {
        return this.http.get<Horario[]>(`${this.apiUrl}/horarios/pelicula/${peliculaId}`);
    }

    crearHorario(horario: HorarioRequest) {
        return this.http.post(`${this.apiUrl}/horarios`, horario, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    // Asientos
    getAsientos(horarioId: number) {
        return this.http.get<Asiento[]>(`${this.apiUrl}/asientos/horario/${horarioId}`);
    }
}