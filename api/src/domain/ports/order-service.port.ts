import { OrderEvent } from '../models/order-event.model';

export interface OrderServicePort {
  processOrderEvent(event: OrderEvent): Promise<void>;
}