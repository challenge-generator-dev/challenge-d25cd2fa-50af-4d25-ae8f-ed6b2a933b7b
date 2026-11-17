import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class OrderEvent {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsDateString()
  @IsNotEmpty()
  timestamp: string;

  constructor(id: string, orderId: string, status: string, timestamp: string) {
    this.id = id;
    this.orderId = orderId;
    this.status = status;
    this.timestamp = timestamp;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (!this.id || typeof this.id !== 'string') {
      throw new Error('OrderEvent id must be a non-empty string');
    }
    if (!this.orderId || typeof this.orderId !== 'string') {
      throw new Error('OrderEvent orderId must be a non-empty string');
    }
    if (!this.status || typeof this.status !== 'string') {
      throw new Error('OrderEvent status must be a non-empty string');
    }
    if (!this.timestamp || typeof this.timestamp !== 'string' || isNaN(Date.parse(this.timestamp))) {
      throw new Error('OrderEvent timestamp must be a valid date string');
    }
  }

  static fromPlainObject(data: Record<string, unknown>): OrderEvent {
    if (!data.id || !data.orderId || !data.status || !data.timestamp) {
      throw new Error('Invalid OrderEvent data: missing required fields');
    }
    return new OrderEvent(
      data.id as string,
      data.orderId as string,
      data.status as string,
      data.timestamp as string
    );
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      orderId: this.orderId,
      status: this.status,
      timestamp: this.timestamp,
    };
  }
}