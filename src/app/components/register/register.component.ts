import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    nombre = '';
    email = '';
    password = '';
    confirmPassword = '';
    error = '';
    success = '';

    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    onSubmit() {
        if (this.password !== this.confirmPassword) {
            this.error = 'Las contraseñas no coinciden';
            return;
        }

        this.auth.register(this.nombre, this.email, this.password).subscribe({
            next: () => {
                this.success = 'Registro exitoso. Redirigiendo...';
                setTimeout(() => this.router.navigate(['/login']), 2000);
            },
            error: (err) => {
                this.error = err.error?.error || 'Error al registrar';
            }
        });
    }
}