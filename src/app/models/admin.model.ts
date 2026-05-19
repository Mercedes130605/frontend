// ============================================
// MODELOS PARA EL PANEL DE ADMINISTRACIÓN
// ============================================

export interface AdminStats {
    totalPeliculas: number;
    totalReservas: number;
    totalPedidos: number;
    totalUsuarios: number;
    ingresosCine: number;
    ingresosBar: number;
    ingresosTotales: number;
}

export interface ReporteDiario {
    fecha: string;
    reservas: number;
    pedidos: number;
    ingresos: number;
}

export interface ReporteMensual {
    mes: string;
    year: number;
    totalReservas: number;
    totalPedidos: number;
    ingresosTotales: number;
}

export interface UsuarioAdmin {
    id: number;
    nombre: string;
    email: string;
    rol: string;
    created_at: Date;
    totalReservas: number;
    totalGastado: number;
}