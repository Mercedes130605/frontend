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
        // ✅ CORREGIDO: añadido /api/ antes de peliculas
        return this.http.get<Pelicula[]>(`${this.apiUrl}/api/peliculas`);
    }

    getPelicula(id: number) {
        // ✅ CORREGIDO: añadido /api/ antes de peliculas
        return this.http.get<Pelicula>(`${this.apiUrl}/api/peliculas/${id}`);
    }

    crearPelicula(pelicula: PeliculaRequest) {
        // ✅ CORREGIDO: añadido /api/ antes de peliculas
        return this.http.post(`${this.apiUrl}/api/peliculas`, pelicula, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    actualizarPelicula(id: number, pelicula: PeliculaRequest) {
        // ✅ CORREGIDO: añadido /api/ antes de peliculas
        return this.http.put(`${this.apiUrl}/api/peliculas/${id}`, pelicula, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    eliminarPelicula(id: number) {
        // ✅ CORREGIDO: añadido /api/ antes de peliculas
        return this.http.delete(`${this.apiUrl}/api/peliculas/${id}`, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    // Horarios
    getHorarios(peliculaId: number) {
        // ✅ CORREGIDO: añadido /api/ antes de horarios/pelicula
        return this.http.get<Horario[]>(`${this.apiUrl}/api/horarios/pelicula/${peliculaId}`);
    }

    crearHorario(horario: HorarioRequest) {
        // ✅ CORREGIDO: añadido /api/ antes de horarios
        return this.http.post(`${this.apiUrl}/api/horarios`, horario, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    // Asientos
    getAsientos(horarioId: number) {
        // ✅ CORREGIDO: añadido /api/ antes de asientos/horario
        return this.http.get<Asiento[]>(`${this.apiUrl}/api/asientos/horario/${horarioId}`);
    }
}