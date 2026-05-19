import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { TicketService } from '../../services/ticket.service';
import { ReservaCine } from '../../models/models';

@Component({
    selector: 'app-ticket',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private reservationService = inject(ReservationService);
    private ticketService = inject(TicketService);
    
    codigoReserva = '';
    reserva = signal<ReservaCine | null>(null);
    cargando = true;

    ngOnInit() {
        this.codigoReserva = this.route.snapshot.params['codigo'];
        this.cargarReserva();
    }

    cargarReserva() {
        this.reservationService.getMisReservas().subscribe({
            next: (res: any) => {
                const encontrada = res.find((r: any) => r.codigo_reserva === this.codigoReserva);
                if (encontrada) {
                    this.reserva.set(encontrada);
                }
                this.cargando = false;
            },
            error: () => {
                this.cargando = false;
            }
        });
    }

    imprimirTicket() {
        const datos = this.reserva();
        if (datos) {
            this.ticketService.imprimirTicket(datos);
        } else {
            window.print();
        }
    }
}