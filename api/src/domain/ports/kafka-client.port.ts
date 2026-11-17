import { Observable } from 'rxjs';
import { OrderEvent } from '../models/order-event.model';

export interface KafkaClientPort {
  consumeEvents(topic: string): Observable<OrderEvent>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}