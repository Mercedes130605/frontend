// ============================================
// MODELOS DE USUARIOS
// ============================================

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    rol: 'cliente' | 'admin';
    created_at?: Date;
}

export interface LoginResponse {
    token: string;
    usuario: Usuario;
}

export interface RegisterRequest {
    nombre: string;
    email: string;
    password: string;
}

// ============================================
// MODELOS DE PELÍCULAS
// ============================================

export interface Pelicula {
    id: number;
    titulo: string;
    descripcion: string;
    duracion: number;
    genero: string;
    imagen_url: string;
    fecha_estreno: string;
    estado?: 'proximamente' | 'cartelera' | 'finalizada';
    created_at?: Date;
}

export interface PeliculaRequest {
    titulo: string;
    descripcion: string;
    duracion: number;
    genero: string;
    imagen_url: string;
    fecha_estreno: string;
}

// ============================================
// MODELOS DE HORARIOS
// ============================================

export interface Horario {
    id: number;
    pelicula_id: number;
    sala: string;
    fecha: string;
    hora: string;
    precio: number;
    pelicula_titulo?: string;
}

export interface HorarioRequest {
    pelicula_id: number;
    sala: string;
    fecha: string;
    hora: string;
    precio: number;
}

// ============================================
// MODELOS DE ASIENTOS
// ============================================

export interface Asiento {
    id: number;
    horario_id: number;
    fila: string;
    numero: number;
    estado: 'libre' | 'ocupado';
}

// ============================================
// MODELOS DE RESERVAS DE CINE
// ============================================

export interface ReservaCine {
    id: number;
    usuario_id: number;
    horario_id: number;
    asiento_id: number;
    codigo_reserva: string;
    total: number;
    estado: 'activa' | 'pagada' | 'cancelada';
    fecha_reserva: Date;
    pelicula?: string;
    sala?: string;
    fecha?: string;
    hora?: string;
    fila?: string;
    asiento_numero?: number;
}

export interface ReservaRequest {
    horario_id: number;
    asiento_id: number;
    total: number;
}

export interface ReservaResponse {
    codigo_reserva: string;
    message: string;
}

// ============================================
// MODELOS DE PRODUCTOS (BAR)
// ============================================

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    imagen_url: string;
    created_at?: Date;
}

export interface ProductoRequest {
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    imagen_url?: string;
}

// ============================================
// MODELOS DE CARRITO
// ============================================

export interface ItemCarrito {
    producto: Producto;
    cantidad: number;
    subtotal: number;
}

// ============================================
// MODELOS DE PEDIDOS (BAR)
// ============================================

export interface PedidoBar {
    id: number;
    usuario_id: number;
    codigo_pedido: string;
    total: number;
    estado: 'pendiente' | 'pagado' | 'entregado';
    fecha: Date;
    productos?: string;
}

export interface PedidoRequest {
    productos: PedidoProducto[];
    total: number;
}

export interface PedidoProducto {
    id: number;
    cantidad: number;
    subtotal: number;
}

export interface PedidoResponse {
    codigo_pedido: string;
    message: string;
}

// ============================================
// MODELOS DE TARJETA Y SALDO
// ============================================

export interface Tarjeta {
    id: number;
    usuario_id: number;
    numero_tarjeta: string;
    saldo: number;
    fecha_creacion: Date;
}

export interface PagoRequest {
    metodo: 'efectivo' | 'tarjeta';
    monto: number;
    numero_tarjeta?: string;
}

export interface PagoResponse {
    success: boolean;
    message: string;
    nuevo_saldo?: number;
}