import { Injectable, signal, effect, computed } from '@angular/core';
import { Producto, ItemCarrito } from '../models/models';

export interface ItemReserva {
    horario_id: number;
    asiento_id: number;
    fila: string;
    numero: number;
    precio: number;
    pelicula: string;
    horario: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
    private items = signal<ItemCarrito[]>([]);
    private reservas = signal<ItemReserva[]>([]);
    
    // Usar computed para que se actualicen automáticamente
    totalItems = computed(() => {
        return this.items().reduce((sum, item) => sum + item.cantidad, 0);
    });
    
    totalPrecio = computed(() => {
        return this.items().reduce((sum, item) => sum + item.subtotal, 0);
    });
    
    totalReservasPrecio = computed(() => {
        return this.reservas().reduce((sum, r) => sum + r.precio, 0);
    });
    
    totalGeneral = computed(() => {
        return this.totalPrecio() + this.totalReservasPrecio();
    });

    constructor() {
        this.cargarCarrito();
        this.cargarReservas();
        
        // Guardar en localStorage cuando cambien
        effect(() => {
            localStorage.setItem('carrito_bar', JSON.stringify(this.items()));
        });
        
        effect(() => {
            localStorage.setItem('reservas_pendientes', JSON.stringify(this.reservas()));
        });
    }

    // ========== MÉTODOS PARA PRODUCTOS ==========
    private cargarCarrito() {
        const guardado = localStorage.getItem('carrito_bar');
        if (guardado) {
            try {
                const parsed = JSON.parse(guardado);
                this.items.set(parsed);
            } catch (error) {
                console.error('Error al cargar el carrito', error);
                this.items.set([]);
            }
        }
    }

    obtenerCarrito() {
        return this.items.asReadonly();
    }

    agregarProducto(producto: Producto, cantidad: number = 1) {
        const index = this.items().findIndex(item => item.producto.id === producto.id);
        
        if (index !== -1) {
            const nuevosItems = [...this.items()];
            nuevosItems[index].cantidad += cantidad;
            nuevosItems[index].subtotal = nuevosItems[index].producto.precio * nuevosItems[index].cantidad;
            this.items.set(nuevosItems);
        } else {
            this.items.update(items => [...items, {
                producto,
                cantidad,
                subtotal: producto.precio * cantidad
            }]);
        }
        // Forzar actualización
        this.items.set([...this.items()]);
    }

    eliminarProducto(productoId: number) {
        this.items.update(items => items.filter(item => item.producto.id !== productoId));
    }

    actualizarCantidad(productoId: number, cantidad: number) {
        if (cantidad <= 0) {
            this.eliminarProducto(productoId);
            return;
        }
        
        const nuevosItems = [...this.items()];
        const index = nuevosItems.findIndex(item => item.producto.id === productoId);
        if (index !== -1) {
            nuevosItems[index].cantidad = cantidad;
            nuevosItems[index].subtotal = nuevosItems[index].producto.precio * cantidad;
            this.items.set(nuevosItems);
        }
    }

    vaciarCarrito() {
        this.items.set([]);
    }

    // ========== MÉTODOS PARA RESERVAS DE ASIENTOS ==========
    private cargarReservas() {
        const guardado = localStorage.getItem('reservas_pendientes');
        if (guardado) {
            try {
                const parsed = JSON.parse(guardado);
                this.reservas.set(parsed);
            } catch (error) {
                console.error('Error al cargar reservas pendientes', error);
                this.reservas.set([]);
            }
        }
    }

    obtenerReservas() {
        return this.reservas.asReadonly();
    }

    agregarReserva(reserva: ItemReserva) {
        const existe = this.reservas().some(r => r.asiento_id === reserva.asiento_id);
        if (!existe) {
            this.reservas.update(reservas => [...reservas, reserva]);
            // Forzar actualización
            this.reservas.set([...this.reservas()]);
        }
        return !existe;
    }

    eliminarReserva(asientoId: number) {
        this.reservas.update(reservas => reservas.filter(r => r.asiento_id !== asientoId));
    }

    vaciarReservas() {
        this.reservas.set([]);
    }

    // Vaciar todo (carrito y reservas)
    vaciarTodo() {
        this.vaciarCarrito();
        this.vaciarReservas();
    }
}