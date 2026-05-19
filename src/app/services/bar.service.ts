import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Producto, ProductoRequest, PedidoRequest, PedidoResponse, PedidoBar } from '../models/models';
import { config } from '../config';

@Injectable({ providedIn: 'root' })
export class BarService {
    private http = inject(HttpClient);
    private auth = inject(AuthService);
    private apiUrl = 'config.apiUrl';

    // Productos
    getProductos() {
        return this.http.get<Producto[]>(`${this.apiUrl}/productos`);
    }

    crearProducto(producto: ProductoRequest) {
        return this.http.post(`${this.apiUrl}/productos`, producto, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    actualizarProducto(id: number, producto: Partial<ProductoRequest>) {
        return this.http.put(`${this.apiUrl}/productos/${id}`, producto, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    eliminarProducto(id: number) {
        return this.http.delete(`${this.apiUrl}/productos/${id}`, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    // Pedidos
    crearPedido(productos: { id: number; cantidad: number; subtotal: number }[], total: number) {
        const pedido: PedidoRequest = {
            productos: productos,
            total: total
        };
        return this.http.post<PedidoResponse>(`${this.apiUrl}/pedidos/bar`, pedido, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    getMisPedidos() {
        return this.http.get<PedidoBar[]>(`${this.apiUrl}/pedidos/mis-pedidos`, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }
}