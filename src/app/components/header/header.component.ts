import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    public auth = inject(AuthService);
    public cartService = inject(CartService);  // ← AÑADIR
    private router = inject(Router);
    
    terminoBusqueda = '';
    mostrarBuscador = false;
    seccionActual = 'movies';
    placeholderBuscador = '🔍 Buscar películas por título, género...';

    constructor() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            this.actualizarSeccion(event.url);
        });
    }

    actualizarSeccion(url: string) {
        if (url.includes('/movies') || url === '/') {
            this.seccionActual = 'movies';
            this.placeholderBuscador = '🔍 Buscar películas por título, género...';
        } else if (url.includes('/bar')) {
            this.seccionActual = 'bar';
            this.placeholderBuscador = '🍿 Buscar productos, snacks, bebidas...';
        } else if (url.includes('/my-reservations')) {
            this.seccionActual = 'reservas';
            this.placeholderBuscador = '🎫 Buscar por código de reserva...';
        } else {
            this.seccionActual = 'general';
            this.placeholderBuscador = '🔍 Buscar...';
        }
    }

    buscar() {
        if (!this.terminoBusqueda.trim()) return;

        switch (this.seccionActual) {
            case 'movies':
                this.router.navigate(['/movies'], { 
                    queryParams: { search: this.terminoBusqueda } 
                });
                break;
            case 'bar':
                this.router.navigate(['/bar'], { 
                    queryParams: { search: this.terminoBusqueda } 
                });
                break;
            default:
                this.router.navigate(['/movies'], { 
                    queryParams: { search: this.terminoBusqueda } 
                });
        }
        
        this.terminoBusqueda = '';
        this.mostrarBuscador = false;
    }

    limpiarBusqueda() {
        this.terminoBusqueda = '';
    }

    toggleBuscador() {
        this.mostrarBuscador = !this.mostrarBuscador;
        if (!this.mostrarBuscador) {
            this.terminoBusqueda = '';
        }
    }

    logout() {
        this.auth.logout();
    }
}