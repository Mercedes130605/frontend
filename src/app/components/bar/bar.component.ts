import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { BarService } from '../../services/bar.service';
import { CartService } from '../../services/cart.service';
import { Producto } from '../../models/models';

@Component({
    selector: 'app-bar',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './bar.component.html',
    styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
    private barService = inject(BarService);
    public cartService = inject(CartService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    
    productosOriginal = signal<Producto[]>([]);
    productosFiltrados = signal<Producto[]>([]);
    terminoBusqueda = '';

    ngOnInit() {
        this.cargarProductos();
        
        this.route.queryParams.subscribe(params => {
            if (params['search']) {
                this.terminoBusqueda = params['search'];
                this.buscarProductos();
            }
        });
    }

    cargarProductos() {
        this.barService.getProductos().subscribe({
            next: (res: any) => {
                this.productosOriginal.set(res);
                this.productosFiltrados.set(res);
            }
        });
    }

    buscarProductos() {
        const termino = this.terminoBusqueda.toLowerCase().trim();
        
        if (termino === '') {
            this.productosFiltrados.set(this.productosOriginal());
            return;
        }
        
        const filtrados = this.productosOriginal().filter(producto => 
            producto.nombre.toLowerCase().includes(termino) ||
            producto.descripcion.toLowerCase().includes(termino) ||
            producto.categoria.toLowerCase().includes(termino)
        );
        
        this.productosFiltrados.set(filtrados);
    }

    getEmoji(categoria: string): string {
        const emojis: any = {
            'Snacks': '🍿',
            'Bebidas': '🥤',
            'Combos': '🍱',
            'Comida': '🌭',
            'Dulces': '🍬'
        };
        return emojis[categoria] || '🍽️';
    }

    agregarAlCarrito(producto: Producto) {
        this.cartService.agregarProducto(producto);
        alert(`✅ ${producto.nombre} agregado al carrito`);
    }
}