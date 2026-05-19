// ============================================
// MODELOS ESPECÍFICOS PARA EL BAR
// ============================================

export interface CategoriaProducto {
    id: string;
    nombre: string;
    icono: string;
}

export const CATEGORIAS: CategoriaProducto[] = [
    { id: 'Snacks', nombre: '🍿 Snacks', icono: '🍿' },
    { id: 'Bebidas', nombre: '🥤 Bebidas', icono: '🥤' },
    { id: 'Combos', nombre: '🍱 Combos', icono: '🍱' },
    { id: 'Comida', nombre: '🌭 Comida', icono: '🌭' },
    { id: 'Dulces', nombre: '🍬 Dulces', icono: '🍬' }
];

export interface CartSummary {
    subtotal: number;
    total: number;
    itemsCount: number;
}

export interface OrderHistory {
    codigo_pedido: string;
    fecha: Date;
    total: number;
    estado: string;
    productos: string;
}

export interface PaymentMethod {
    id: string;
    nombre: string;
    icono: string;
}

export const METODOS_PAGO: PaymentMethod[] = [
    { id: 'efectivo', nombre: 'Efectivo', icono: '💰' },
    { id: 'tarjeta', nombre: 'Tarjeta', icono: '💳' },
    { id: 'yape', nombre: 'Yape', icono: '📱' },
    { id: 'plin', nombre: 'Plin', icono: '📱' }
];