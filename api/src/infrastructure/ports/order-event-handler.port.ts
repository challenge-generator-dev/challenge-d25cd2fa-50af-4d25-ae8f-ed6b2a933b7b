import { OrderEvent } from '../../domain/models/order-event.model';

export interface OrderEventHandlerPort {
  handleOrderEvent(event: OrderEvent): Promise<void>;
  validateEvent(event: OrderEvent): { isValid: boolean; errors: string[] };
}