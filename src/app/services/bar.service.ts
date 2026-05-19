import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Producto, ProductoRequest, PedidoRequest, PedidoResponse, PedidoBar } from '../models/models';
import { config } from '../config';

@Injectable({ providedIn: 'root' })
export class BarService {
    private http = inject(HttpClient);
    private auth = inject(AuthService);
    private apiUrl = config.apiUrl;

    // Productos
    getProductos() {
        // ✅ CORREGIDO: añadido /api/ antes de productos
        return this.http.get<Producto[]>(`${this.apiUrl}/api/productos`);
    }

    crearProducto(producto: ProductoRequest) {
        // ✅ CORREGIDO: añadido /api/ antes de productos
        return this.http.post(`${this.apiUrl}/api/productos`, producto, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    actualizarProducto(id: number, producto: Partial<ProductoRequest>) {
        // ✅ CORREGIDO: añadido /api/ antes de productos
        return this.http.put(`${this.apiUrl}/api/productos/${id}`, producto, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    eliminarProducto(id: number) {
        // ✅ CORREGIDO: añadido /api/ antes de productos
        return this.http.delete(`${this.apiUrl}/api/productos/${id}`, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    // Pedidos
    crearPedido(productos: { id: number; cantidad: number; subtotal: number }[], total: number) {
        const pedido: PedidoRequest = {
            productos: productos,
            total: total
        };
        // ✅ CORREGIDO: añadido /api/ antes de pedidos/bar
        return this.http.post<PedidoResponse>(`${this.apiUrl}/api/pedidos/bar`, pedido, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }

    getMisPedidos() {
        // ✅ CORREGIDO: añadido /api/ antes de pedidos/mis-pedidos
        return this.http.get<PedidoBar[]>(`${this.apiUrl}/api/pedidos/mis-pedidos`, {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` }
        });
    }
}