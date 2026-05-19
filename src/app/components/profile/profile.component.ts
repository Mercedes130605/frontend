import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TarjetaService } from '../../services/tarjeta.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public auth = inject(AuthService);
    private tarjetaService = inject(TarjetaService);
    
    editando = false;
    editandoTarjeta = false;
    
    usuarioEdit = {
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    tarjetaInfo = {
        numero_tarjeta: '',
        saldo: 0
    };

    nuevaTarjeta = {
        numero_tarjeta: '',
        saldo: ''
    };

    recargaMonto = 0;
    mensaje = '';
    error = '';

    ngOnInit() {
        this.cargarTarjeta();
    }

    cargarTarjeta() {
        this.tarjetaService.getTarjeta().subscribe({
            next: (res: any) => {
                this.tarjetaInfo = res;
            },
            error: () => {
                // No tiene tarjeta
            }
        });
    }

    activarEdicion() {
        const usuario = this.auth.usuarioActual();
        if (usuario) {
            this.usuarioEdit = {
                nombre: usuario.nombre,
                email: usuario.email,
                password: '',
                confirmPassword: ''
            };
        }
        this.editando = true;
        this.mensaje = '';
        this.error = '';
    }

    cancelarEdicion() {
        this.editando = false;
    }

    guardarCambios() {
        if (this.usuarioEdit.password && this.usuarioEdit.password !== this.usuarioEdit.confirmPassword) {
            this.error = 'Las contraseñas no coinciden';
            return;
        }
        
        // Aquí iría la llamada al backend para actualizar perfil
        alert('Funcionalidad en desarrollo');
        this.editando = false;
    }

    activarEdicionTarjeta() {
        this.nuevaTarjeta = {
            numero_tarjeta: this.tarjetaInfo.numero_tarjeta || '',
            saldo: this.tarjetaInfo.saldo.toString()
        };
        this.editandoTarjeta = true;
    }

    guardarTarjeta() {
        this.tarjetaService.actualizarTarjeta(
            this.nuevaTarjeta.numero_tarjeta,
            parseFloat(this.nuevaTarjeta.saldo)
        ).subscribe({
            next: () => {
                this.cargarTarjeta();
                this.editandoTarjeta = false;
                this.mensaje = 'Tarjeta actualizada correctamente';
                setTimeout(() => this.mensaje = '', 3000);
            },
            error: (err) => {
                this.error = err.error?.error || 'Error al actualizar tarjeta';
            }
        });
    }

    recargarSaldo() {
        if (this.recargaMonto <= 0) {
            this.error = 'Ingresa un monto válido';
            return;
        }

        this.tarjetaService.recargarSaldo(this.recargaMonto).subscribe({
            next: () => {
                this.cargarTarjeta();
                this.recargaMonto = 0;
                this.mensaje = 'Saldo recargado correctamente';
                setTimeout(() => this.mensaje = '', 3000);
            },
            error: (err) => {
                this.error = err.error?.error || 'Error al recargar saldo';
            }
        });
    }
}