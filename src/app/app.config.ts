import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { loadConfig } from './config';

export function initializeApp() {
  return () => loadConfig();
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([authInterceptor, errorInterceptor, loadingInterceptor])
        ),
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            multi: true
        }
    ]
};