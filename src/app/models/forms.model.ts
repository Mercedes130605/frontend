// ============================================
// MODELOS PARA FORMULARIOS
// ============================================

export interface LoginForm {
    email: string;
    password: string;
}

export interface RegisterForm {
    nombre: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface PeliculaForm {
    titulo: string;
    descripcion: string;
    duracion: number;
    genero: string;
    imagen_url: string;
    fecha_estreno: string;
}

export interface HorarioForm {
    pelicula_id: number;
    sala: string;
    fecha: string;
    hora: string;
    precio: number;
}

export interface ProductoForm {
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    imagen_url: string;
}

export interface ReservaForm {
    horario_id: number;
    asiento_id: number;
}

export interface PedidoForm {
    productos: { id: number; cantidad: number }[];
}