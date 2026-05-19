import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ReservaRequest, ReservaResponse, ReservaCine } from '../models/models';
import { config } from '../config';

@Injectable({ providedIn: 'root' })
export class ReservationService {
    private http = inject(HttpClient);
    private auth = inject(AuthService);
    private apiUrl = config.apiUrl;

    crearReserva(horarioId: number, asientoId: number, total: number) {
        const reserva: ReservaRequest = {
            horario_id: horarioId,
            asiento_id: asientoId,
            total: total
        };
        return this.http.post<ReservaResponse>(`${this.apiUrl}/reservas/cine`, reserva, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    getMisReservas() {
        return this.http.get<ReservaCine[]>(`${this.apiUrl}/reservas/mis-reservas`, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }
}