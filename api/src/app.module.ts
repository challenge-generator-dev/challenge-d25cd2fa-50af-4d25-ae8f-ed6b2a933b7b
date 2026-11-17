import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderService } from './infrastructure/adapters/order/order.service';
import { KafkaConsumerService } from './infrastructure/adapters/kafka/kafka-consumer.service';
import { SseService } from './infrastructure/adapters/sse/sse.service';
import { SSEController } from './infrastructure/controllers/sse.controller';
import { OrderEventHandler } from './application/services/order-event.handler';
import { OrderEventHandlerPort } from './infrastructure/ports/order-event-handler.port';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [SSEController],
  providers: [
    {
      provide: 'OrderServicePort',
      useClass: OrderService,
    },
    {
      provide: 'OrderEventHandlerPort',
      useClass: OrderEventHandler,
    },
    {
      provide: 'KafkaClientPort',
      useClass: KafkaConsumerService,
    },
    SseService,
    KafkaConsumerService,
    OrderEventHandler,
  ],
})
export class AppModule {}