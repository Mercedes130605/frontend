import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(LoadingService);
    
    // Solo mostrar loading para peticiones a la API
    if (req.url.includes('/api/')) {
        loadingService.show();
        return next(req).pipe(
            finalize(() => loadingService.hide())
        );
    }
    
    return next(req);
};