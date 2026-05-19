// ============================================
// MODELOS ESPECÍFICOS PARA RESERVAS
// ============================================

export interface ReservationDetail {
    id: number;
    codigo_reserva: string;
    pelicula: string;
    sala: string;
    fecha: string;
    hora: string;
    fila: string;
    asiento_numero: number;
    total: number;
    estado: string;
    fecha_reserva: Date;
}

export interface TicketData {
    codigo: string;
    pelicula: string;
    sala: string;
    fecha: string;
    hora: string;
    asiento: string;
    precio: number;
    fecha_compra: Date;
}

export interface SeatMap {
    horarioId: number;
    filas: SeatRow[];
}

export interface SeatRow {
    letra: string;
    asientos: SeatInfo[];
}

export interface SeatInfo {
    id: number;
    numero: number;
    estado: 'libre' | 'ocupado';
    seleccionado?: boolean;
}