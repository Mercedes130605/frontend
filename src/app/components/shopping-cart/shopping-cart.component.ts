import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, ItemReserva } from '../../services/cart.service';
import { BarService } from '../../services/bar.service';
import { ReservationService } from '../../services/reservation.service';
import { TarjetaService } from '../../services/tarjeta.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-shopping-cart',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
    private cartService = inject(CartService);
    private barService = inject(BarService);
    private reservationService = inject(ReservationService);
    private tarjetaService = inject(TarjetaService);
    private auth = inject(AuthService);
    private router = inject(Router);
    
    metodoPago: 'efectivo' | 'tarjeta' = 'efectivo';
    mostrarModalPago = false;
    procesando = false;
    errorPago = '';
    tarjetaInfo: any = null;

    get carrito() {
        return this.cartService.obtenerCarrito();
    }

    get reservas() {
        return this.cartService.obtenerReservas();
    }

    get totalPrecio() {
        return this.cartService.totalPrecio();
    }

    get totalReservas() {
        return this.cartService.totalReservasPrecio();
    }

    get totalGeneral() {
        return this.cartService.totalGeneral();
    }

    ngOnInit() {
        this.cargarTarjeta();
    }

    cargarTarjeta() {
        this.tarjetaService.getTarjeta().subscribe({
            next: (res: any) => {
                this.tarjetaInfo = res;
            },
            error: () => {
                // No tiene tarjeta asignada
            }
        });
    }

    actualizarCantidad(productoId: number, cantidad: number) {
        this.cartService.actualizarCantidad(productoId, cantidad);
    }

    eliminarProducto(productoId: number) {
        this.cartService.eliminarProducto(productoId);
    }

    eliminarReserva(asientoId: number) {
        this.cartService.eliminarReserva(asientoId);
    }

    abrirModalPago() {
        this.errorPago = '';
        this.mostrarModalPago = true;
    }

    cerrarModal() {
        this.mostrarModalPago = false;
        this.errorPago = '';
    }

    procesarPago() {
        this.procesando = true;
        this.errorPago = '';

        if (this.metodoPago === 'tarjeta') {
            // Validar saldo suficiente
            if (!this.tarjetaInfo || this.tarjetaInfo.saldo < this.totalGeneral) {
                this.errorPago = 'Saldo insuficiente. Recarga tu tarjeta.';
                this.procesando = false;
                return;
            }

            // Procesar pago con tarjeta
            this.tarjetaService.procesarPago({
                metodo: 'tarjeta',
                monto: this.totalGeneral,
                numero_tarjeta: this.tarjetaInfo?.numero_tarjeta
            }).subscribe({
                next: () => {
                    this.realizarPedidoCompleto();
                },
                error: (err) => {
                    this.errorPago = err.error?.error || 'Error al procesar el pago';
                    this.procesando = false;
                }
            });
        } else {
            // Pago en efectivo
            this.realizarPedidoCompleto();
        }
    }

    realizarPedidoCompleto() {
        // 1. Crear reservas de cine
        const reservasObs = this.reservas().map((reserva: ItemReserva) =>
            this.reservationService.crearReserva(
                reserva.horario_id,
                reserva.asiento_id,
                reserva.precio
            ).toPromise()
        );

        // 2. Crear pedido del bar
        const productosPedido = this.carrito().map(item => ({
            id: item.producto.id,
            cantidad: item.cantidad,
            subtotal: item.subtotal
        }));

        const pedidoObs = this.barService.crearPedido(productosPedido, this.totalPrecio).toPromise();

        // Ejecutar todo
        Promise.all([...reservasObs, pedidoObs]).then(() => {
            this.cartService.vaciarTodo();
            this.cerrarModal();
            alert('¡Compra realizada con éxito!');
            this.router.navigate(['/my-reservations']);
        }).catch((err) => {
            this.errorPago = 'Error al procesar la compra';
            this.procesando = false;
        });
    }
}