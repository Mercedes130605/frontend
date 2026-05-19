import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario, LoginResponse } from '../models/models';
import { config } from '../config';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private apiUrl = 'config.apiUrl';
    private tokenKey = 'auth_token';
    
    usuarioActual = signal<Usuario | null>(null);
    estaAutenticado = signal(false);

    constructor() {
        const token = localStorage.getItem(this.tokenKey);
        if (token) {
            this.cargarUsuarioDesdeToken(token);
        }
    }

    private cargarUsuarioDesdeToken(token: string) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            this.usuarioActual.set({
                id: payload.id,
                nombre: payload.nombre,
                email: payload.email,
                rol: payload.rol
            });
            this.estaAutenticado.set(true);
        } catch (error) {
            this.logout();
        }
    }

    login(email: string, password: string) {
        return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password });
    }

    register(nombre: string, email: string, password: string) {
        return this.http.post(`${this.apiUrl}/auth/register`, { nombre, email, password });
    }

    setSesion(token: string, usuario: Usuario) {
        localStorage.setItem(this.tokenKey, token);
        this.usuarioActual.set(usuario);
        this.estaAutenticado.set(true);
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        this.usuarioActual.set(null);
        this.estaAutenticado.set(false);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    esAdmin(): boolean {
        return this.usuarioActual()?.rol === 'admin';
    }
}