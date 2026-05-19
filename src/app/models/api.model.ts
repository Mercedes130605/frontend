// ============================================
// MODELOS PARA RESPUESTAS DE LA API
// ============================================

import { Usuario } from './models';

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface ApiError {
    status: number;
    message: string;
    error: string;
    timestamp: Date;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface LoginApiResponse {
    token: string;
    usuario: Usuario;
}

export interface CreateResponse {
    id: number;
    message: string;
}

export interface DeleteResponse {
    message: string;
}

export interface UpdateResponse {
    message: string;
}