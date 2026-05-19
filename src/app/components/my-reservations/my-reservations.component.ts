import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { ReservaCine } from '../../models/models';

@Component({
    selector: 'app-my-reservations',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './my-reservations.component.html',
    styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {
    private reservationService = inject(ReservationService);
    reservas = signal<ReservaCine[]>([]);

    ngOnInit() {
        this.reservationService.getMisReservas().subscribe((res: any) => {
            this.reservas.set(res);
        });
    }
}