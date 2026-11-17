// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Logger, Inject } from '@nestjs/common';
import { KafkaClientPort } from '../../../domain/ports/kafka-client.port';
import { OrderEvent } from '../../../domain/models/order-event.model';

export interface KafkaMessage {
  value: string | null;
  key?: string;
  partition?: number;
  offset?: string;
  timestamp?: string;
}

@Injectable()
export class KafkaConsumerService {
  private readonly logger = new Logger(KafkaConsumerService.name);
  private isSubscribed = false;
  private currentTopic: string | null = null;
  private messageHandler: ((message: KafkaMessage) => Promise<void>) | null = null;

  constructor(@Inject('KafkaClientPort') private readonly kafkaClient: KafkaClientPort) {}

  async subscribe(topic: string, onMessage: (message: KafkaMessage) => Promise<void>): Promise<void> {
    throw new Error('TODO(reto): subscribe');
  }

  handleError(error: Error): void {
    throw new Error('TODO(reto): handleError');
  }

  async unsubscribe(): Promise<void> {
    if (!this.isSubscribed) {
      return;
    }

    try {
      await this.kafkaClient.disconnect();
      this.isSubscribed = false;
      this.currentTopic = null;
      this.messageHandler = null;
      this.logger.log('Disconnected from Kafka broker');
    } catch (error) {
      this.handleError(error as Error);
    }
  }

  isCurrentlySubscribed(): boolean {
    return this.isSubscribed;
  }

  getCurrentTopic(): string | null {
    return this.currentTopic;
  }
}