// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, signal, computed } from '@angular/core';
import { OrderEvent, OrderEventSignal } from '../../shared/models/order-event.model';

@Injectable({
    providedIn: 'root'
})
export class OrderEventService {
    private readonly baseUrl = 'http://localhost:3000';
    private eventSource: EventSource | null = null;
    private reconnectAttempts = 0;
    private readonly maxReconnectAttempts = 5;
    private readonly reconnectDelay = 3000;

    private readonly _lastEvent = signal<OrderEvent | null>(null);
    private readonly _events = signal<OrderEvent[]>([]);
    private readonly _connectionStatus = signal<'connected' | 'disconnected' | 'error'>('disconnected');

    readonly orderEventSignal: OrderEventSignal = {
        lastEvent: this._lastEvent.asReadonly(),
        events: this._events.asReadonly()
    };

    readonly isConnected = computed(() => this._connectionStatus() === 'connected');
    readonly connectionStatus = this._connectionStatus.asReadonly();

    subscribeToOrderEvents(callback: (event: OrderEvent) => void): () => void {
      throw new Error('TODO(reto): subscribeToOrderEvents');
    }

    private connect(callback: (event: OrderEvent) => void): void {
        if (this.eventSource) {
            this.eventSource.close();
        }

        try {
            this.eventSource = new EventSource(`${this.baseUrl}/orders/events`);
            this._connectionStatus.set('connected');
            this.reconnectAttempts = 0;

            this.eventSource.onmessage = (event) => {
                try {
                    const parsedEvent: OrderEvent = JSON.parse(event.data);
                    this.handleEvent(parsedEvent, callback);
                } catch (parseError) {
                    console.error('[OrderEventService] Error parsing event data:', parseError);
                }
            };

            this.eventSource.onerror = (error) => {
                console.error('[OrderEventService] SSE connection error:', error);
                this._connectionStatus.set('error');
                this.handleReconnect(callback);
            };

            this.eventSource.onopen = () => {
                console.log('[OrderEventService] SSE connection established');
                this._connectionStatus.set('connected');
            };
        } catch (error) {
            console.error('[OrderEventService] Failed to create EventSource:', error);
            this._connectionStatus.set('error');
            this.handleReconnect(callback);
        }
    }

    private handleEvent(event: OrderEvent, callback: (event: OrderEvent) => void): void {
      throw new Error('TODO(reto): handleEvent');
    }

    private handleReconnect(callback: (event: OrderEvent) => void): void {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('[OrderEventService] Max reconnection attempts reached');
            this._connectionStatus.set('error');
            return;
        }

        this.reconnectAttempts++;
        console.log(`[OrderEventService] Attempting reconnection ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);

        setTimeout(() => {
            this.connect(callback);
        }, this.reconnectDelay);
    }

    private disconnect(): void {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
            this._connectionStatus.set('disconnected');
            console.log('[OrderEventService] SSE connection closed');
        }
    }

    clearEvents(): void {
        this._events.set([]);
        this._lastEvent.set(null);
    }

    getLastEvent(): OrderEvent | null {
        return this._lastEvent();
    }

    getAllEvents(): OrderEvent[] {
        return this._events();
    }
}