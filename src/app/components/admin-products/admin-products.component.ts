import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarService } from '../../services/bar.service';
import { Producto } from '../../models/models';

@Component({
    selector: 'app-admin-products',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
    private barService = inject(BarService);
    productos: Producto[] = [];
    mostrarFormulario = false;
    editando = false;
    productoEditId: number | null = null;
    nuevoProducto: any = {};

    ngOnInit() {
        this.cargarProductos();
    }

    cargarProductos() {
        this.barService.getProductos().subscribe((res: any) => {
            this.productos = res;
        });
    }

    abrirFormularioCrear() {
        this.editando = false;
        this.productoEditId = null;
        this.nuevoProducto = {};
        this.mostrarFormulario = true;
    }

    editarProducto(producto: Producto) {
        this.editando = true;
        this.productoEditId = producto.id;
        this.nuevoProducto = { ...producto };
        this.mostrarFormulario = true;
    }

    guardarProducto() {
        if (this.editando && this.productoEditId) {
            this.barService.actualizarProducto(this.productoEditId, this.nuevoProducto).subscribe(() => {
                this.cargarProductos();
                this.mostrarFormulario = false;
                this.nuevoProducto = {};
                this.editando = false;
            });
        } else {
            this.barService.crearProducto(this.nuevoProducto).subscribe(() => {
                this.cargarProductos();
                this.mostrarFormulario = false;
                this.nuevoProducto = {};
            });
        }
    }

    eliminarProducto(id: number) {
        if (confirm('¿Eliminar este producto?')) {
            this.barService.eliminarProducto(id).subscribe(() => {
                this.cargarProductos();
            });
        }
    }
}