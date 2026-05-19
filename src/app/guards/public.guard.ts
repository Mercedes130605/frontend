import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const PublicGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Si ya está autenticado, redirige a movies
    if (authService.estaAutenticado()) {
        router.navigate(['/movies']);
        return false;
    }

    // Si no está autenticado, permite acceso a página pública (login/register)
    return true;
};