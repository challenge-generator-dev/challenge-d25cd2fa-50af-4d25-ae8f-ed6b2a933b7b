import { Component, Input, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderEvent } from '../../models/order-event.model';

/**
 * Componente presentacional que muestra el estado de una orden.
 * Renderiza la información del evento de orden de forma visual con indicadores de estado.
 */
@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent {
  private readonly _orderEvent = signal<OrderEvent | null>(null);

  /**
   * Evento de orden a mostrar.
   */
  @Input()
  set orderEvent(value: OrderEvent | null) {
    this._orderEvent.set(value);
  }

  get orderEvent(): OrderEvent | null {
    return this._orderEvent();
  }

  /**
   * Estado actual de la orden formateado para visualización.
   */
  readonly displayStatus = computed(() => {
    const event = this._orderEvent();
    if (!event) {
      return 'Sin datos';
    }
    return this.formatStatus(event.status);
  });

  /**
   * Clase CSS asociada al estado de la orden.
   */
  readonly statusClass = computed(() => {
    const event = this._orderEvent();
    if (!event) {
      return 'status-unknown';
    }
    return this.getStatusClass(event.status);
  });

  /**
   * Indicador visual de si el estado representa una orden activa.
   */
  readonly isActive = computed(() => {
    const event = this._orderEvent();
    if (!event) {
      return false;
    }
    return this.isActiveStatus(event.status);
  });

  /**
   * Indicador visual de si el estado representa una orden completada.
   */
  readonly isCompleted = computed(() => {
    const event = this._orderEvent();
    if (!event) {
      return false;
    }
    return event.status === 'DELIVERED';
  });

  /**
   * Indicador visual de si el estado representa una orden cancelada.
   */
  readonly isCancelled = computed(() => {
    const event = this._orderEvent();
    if (!event) {
      return false;
    }
    return event.status === 'CANCELLED';
  });

  /**
   * Formatea la marca de tiempo para visualización legible.
   */
  readonly formattedTimestamp = computed(() => {
    const event = this._orderEvent();
    if (!event || !event.timestamp) {
      return '—';
    }
    return this.formatTimestamp(event.timestamp);
  });

  /**
   * Formatea el ID de la orden para mostrar de forma abreviada.
   */
  readonly shortOrderId = computed(() => {
    const event = this._orderEvent();
    if (!event || !event.orderId) {
      return '—';
    }
    return event.orderId.substring(0, 8).toUpperCase();
  });

  /**
   * Convierte el estado raw a un formato legible.
   */
  private formatStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'CREATED': 'Creada',
      'PROCESSING': 'Procesando',
      'SHIPPED': 'Enviada',
      'DELIVERED': 'Entregada',
      'CANCELLED': 'Cancelada'
    };
    return statusMap[status] || status;
  }

  /**
   * Retorna la clase CSS correspondiente al estado.
   */
  private getStatusClass(status: string): string {
    const classMap: Record<string, string> = {
      'CREATED': 'status-created',
      'PROCESSING': 'status-processing',
      'SHIPPED': 'status-shipped',
      'DELIVERED': 'status-delivered',
      'CANCELLED': 'status-cancelled'
    };
    return classMap[status] || 'status-unknown';
  }

  /**
   * Determina si el estado representa una orden activa.
   */
  private isActiveStatus(status: string): boolean {
    return ['CREATED', 'PROCESSING', 'SHIPPED'].includes(status);
  }

  /**
   * Formatea la marca de tiempo ISO a formato local legible.
   */
  private formatTimestamp(isoString: string): string {
    try {
      const date = new Date(isoString);
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      return date.toLocaleDateString('es-ES', options);
    } catch {
      return isoString;
    }
  }
}