import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    
    return next(req).pipe(
        catchError((error) => {
            // Error 401 - No autorizado (token expirado o inválido)
            if (error.status === 401) {
                authService.logout();
                router.navigate(['/login']);
            }
            
            // Error 403 - Prohibido (no tiene permisos)
            if (error.status === 403) {
                console.error('Acceso denegado:', error.error?.error || 'No tienes permisos');
                alert('No tienes permisos para realizar esta acción');
                router.navigate(['/movies']);
            }
            
            // Error 404 - No encontrado
            if (error.status === 404) {
                console.error('Recurso no encontrado:', error.url);
            }
            
            // Error 500 - Error del servidor
            if (error.status === 500) {
                console.error('Error del servidor:', error.message);
                alert('Error en el servidor. Intenta más tarde.');
            }
            
            return throwError(() => error);
        })
    );
};