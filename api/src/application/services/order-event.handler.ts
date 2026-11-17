// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Logger, Inject } from '@nestjs/common';
import { OrderEvent } from '../../domain/models/order-event.model';
import { OrderServicePort } from '../../domain/ports/order-service.port';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

@Injectable()
export class OrderEventHandler {
  private readonly logger = new Logger(OrderEventHandler.name);

  constructor(@Inject('OrderServicePort') private readonly orderService: OrderServicePort) {}

  async handleOrderEvent(event: OrderEvent): Promise<void> {
    throw new Error('TODO(reto): handleOrderEvent');
  }

  validateEvent(event: OrderEvent): ValidationResult {
    throw new Error('TODO(reto): validateEvent');
  }
}