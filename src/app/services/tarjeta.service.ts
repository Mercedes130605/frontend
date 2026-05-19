import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Tarjeta, PagoRequest, PagoResponse } from '../models/models';

@Injectable({ providedIn: 'root' })
export class TarjetaService {
    private http = inject(HttpClient);
    private auth = inject(AuthService);
    private apiUrl = 'http://localhost:3000/api';

    // Obtener tarjeta del usuario
    getTarjeta() {
        return this.http.get<Tarjeta>(`${this.apiUrl}/tarjeta`, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    // Actualizar tarjeta y saldo
    actualizarTarjeta(numero_tarjeta: string, saldo: number) {
        return this.http.put(`${this.apiUrl}/tarjeta`, { numero_tarjeta, saldo }, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    // Recargar saldo
    recargarSaldo(monto: number) {
        return this.http.post(`${this.apiUrl}/tarjeta/recargar`, { monto }, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    // Procesar pago
    procesarPago(pago: PagoRequest) {
        return this.http.post<PagoResponse>(`${this.apiUrl}/pagos/procesar`, pago, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }
}