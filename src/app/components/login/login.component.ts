import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email = '';
    password = '';
    error = '';

    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    onSubmit() {
        this.auth.login(this.email, this.password).subscribe({
            next: (res: any) => {
                this.auth.setSesion(res.token, res.usuario);
                this.router.navigate(['/movies']);
            },
            error: (err) => {
                this.error = err.error?.error || 'Credenciales inválidas';
            }
        });
    }
}