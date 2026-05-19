import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Tarjeta, PagoRequest, PagoResponse } from '../models/models';
import { config } from '../config';

@Injectable({ providedIn: 'root' })
export class TarjetaService {
    private http = inject(HttpClient);
    private auth = inject(AuthService);
    private apiUrl = config.apiUrl;

    // Obtener tarjeta del usuario
    getTarjeta() {
        // ✅ CORREGIDO: añadido /api/ antes de tarjeta
        return this.http.get<Tarjeta>(`${this.apiUrl}/api/tarjeta`, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    // Actualizar tarjeta y saldo
    actualizarTarjeta(numero_tarjeta: string, saldo: number) {
        // ✅ CORREGIDO: añadido /api/ antes de tarjeta
        return this.http.put(`${this.apiUrl}/api/tarjeta`, { numero_tarjeta, saldo }, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    // Recargar saldo
    recargarSaldo(monto: number) {
        // ✅ CORREGIDO: añadido /api/ antes de tarjeta/recargar
        return this.http.post(`${this.apiUrl}/api/tarjeta/recargar`, { monto }, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    // Procesar pago
    procesarPago(pago: PagoRequest) {
        // ✅ CORREGIDO: añadido /api/ antes de pagos/procesar
        return this.http.post<PagoResponse>(`${this.apiUrl}/api/pagos/procesar`, pago, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }
}