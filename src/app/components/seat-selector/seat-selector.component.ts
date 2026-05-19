import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CartService } from '../../services/cart.service';
import { ItemReserva } from '../../services/cart.service';
import { Asiento } from '../../models/models';

@Component({
    selector: 'app-seat-selector',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './seat-selector.component.html',
    styleUrls: ['./seat-selector.component.css']
})
export class SeatSelectorComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private movieService = inject(MovieService);
    private cartService = inject(CartService);
    
    horarioId = 0;
    precio = 15;
    peliculaTitulo = '';
    horarioHora = '';
    horarioFecha = '';
    sala = '';
    asientos = signal<Asiento[]>([]);
    asientosSeleccionados: Asiento[] = [];
    filas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    ngOnInit() {
        this.horarioId = Number(this.route.snapshot.params['horarioId']);
        this.cargarAsientos();
        this.cargarInfoHorario();
    }

    cargarAsientos() {
        this.movieService.getAsientos(this.horarioId).subscribe({
            next: (res: any) => {
                this.asientos.set(res);
            }
        });
    }

    cargarInfoHorario() {
        this.movieService.getHorarios(this.horarioId).subscribe({
            next: (res: any) => {
                if (res.length > 0) {
                    this.precio = res[0].precio;
                    this.peliculaTitulo = res[0].pelicula_titulo;
                    this.horarioHora = res[0].hora;
                    this.horarioFecha = res[0].fecha;
                    this.sala = res[0].sala;
                }
            }
        });
    }

    getAsientosByRow(fila: string): Asiento[] {
        return this.asientos().filter(a => a.fila === fila);
    }

    isSeleccionado(asiento: Asiento): boolean {
        return this.asientosSeleccionados.some(a => a.id === asiento.id);
    }

    isOcupado(asiento: Asiento): boolean {
        return asiento.estado === 'ocupado';
    }

    toggleSeat(asiento: Asiento) {
        if (asiento.estado === 'ocupado') return;
        
        const index = this.asientosSeleccionados.findIndex(a => a.id === asiento.id);
        if (index === -1) {
            this.asientosSeleccionados.push(asiento);
        } else {
            this.asientosSeleccionados.splice(index, 1);
        }
    }

    agregarAlCarrito() {
        if (this.asientosSeleccionados.length === 0) {
            alert('Selecciona al menos un asiento');
            return;
        }

        for (const asiento of this.asientosSeleccionados) {
            const reserva: ItemReserva = {
                horario_id: this.horarioId,
                asiento_id: asiento.id,
                fila: asiento.fila,
                numero: asiento.numero,
                precio: this.precio,
                pelicula: this.peliculaTitulo,
                horario: `${this.horarioFecha} ${this.horarioHora} - ${this.sala}`
            };
            this.cartService.agregarReserva(reserva);
        }
        
        alert(`${this.asientosSeleccionados.length} asiento(s) agregado(s) al carrito`);
        this.asientosSeleccionados = [];
        this.router.navigate(['/cart']);
    }
}