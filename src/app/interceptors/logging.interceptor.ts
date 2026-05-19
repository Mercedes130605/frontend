import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
    // Solo mostrar logs en desarrollo
    if (environment?.production) {
        return next(req);
    }
    
    const startTime = Date.now();
    
    console.log(`📤 [${req.method}] ${req.url}`);
    
    return next(req).pipe(
        tap({
            next: (response) => {
                const endTime = Date.now();
                console.log(`📥 [${req.method}] ${req.url} - ${endTime - startTime}ms ✅`);
            },
            error: (error) => {
                const endTime = Date.now();
                console.error(`❌ [${req.method}] ${req.url} - ${endTime - startTime}ms - Error: ${error.status}`);
            }
        })
    );
};

const environment = {
    production: false
};