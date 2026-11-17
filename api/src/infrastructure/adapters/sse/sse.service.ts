import { Injectable, Logger } from '@nestjs/common';
import { Observable, Subject, filter, map, share } from 'rxjs';
import { OrderEvent } from '../../../domain/models/order-event.model';

@Injectable()
export class SseService {
  private readonly logger = new Logger(SseService.name);
  private readonly eventSubject = new Subject<OrderEvent>();
  private readonly sharedEvents$: Observable<OrderEvent>;

  constructor() {
    this.sharedEvents$ = this.eventSubject.asObservable().pipe(
      share(),
    );
  }

  emitOrderEvent(event: OrderEvent): void {
    if (!event || !event.id || !event.orderId) {
      this.logger.warn('Intento de emitir evento inválido', event);
      return;
    }

    try {
      this.eventSubject.next(event);
      this.logger.debug(`Evento emitido: ${event.id} - Estado: ${event.status}`);
    } catch (error) {
      this.logger.error('Error al emitir evento', error);
    }
  }

  getOrderEvents(): Observable<OrderEvent> {
    return this.sharedEvents$;
  }

  getEventsByStatus(status: string): Observable<OrderEvent> {
    return this.sharedEvents$.pipe(
      filter((event) => event.status === status),
    );
  }

  getEventsByOrderId(orderId: string): Observable<OrderEvent> {
    return this.sharedEvents$.pipe(
      filter((event) => event.orderId === orderId),
    );
  }

  transformEvents<T>(transformFn: (event: OrderEvent) => T): Observable<T> {
    return this.sharedEvents$.pipe(
      map(transformFn),
    );
  }

  close(): void {
    this.eventSubject.complete();
    this.logger.log('SSE Service cerrado - Subject completado');
  }
}