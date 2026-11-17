/**
 * Modelo de datos para eventos de orden.
 * Representa un evento emitido por el sistema de órdenes, como cambios de estado.
 */
export interface OrderEvent {
    /**
     * Identificador único del evento.
     */
    id: string;

    /**
     * Identificador único de la orden asociada al evento.
     */
    orderId: string;

    /**
     * Estado actual de la orden en el momento del evento.
     * Ejemplos: 'CREATED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'.
     */
    status: string;

    /**
     * Marca de tiempo del evento en formato ISO 8601.
     */
    timestamp: string;
}

// Señales para manejo reactivo del estado de eventos
export type OrderEventSignal = {
    /**
     * Señal que contiene el último evento recibido.
     */
    lastEvent: OrderEvent | null;

    /**
     * Señal que contiene la lista de todos los eventos recibidos.
     */
    events: OrderEvent[];
};