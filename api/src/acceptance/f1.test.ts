import { Test, TestingModule } from '@nestjs/testing';
import { KafkaConsumerService, KafkaMessage } from '../infrastructure/adapters/kafka/kafka-consumer.service';
import { OrderEventHandler } from '../application/services/order-event.handler';
import { KafkaClientPort } from '../domain/ports/kafka-client.port';
import { OrderServicePort } from '../domain/ports/order-service.port';
import { OrderEvent } from '../domain/models/order-event.model';
import { Observable, of, throwError, Subject } from 'rxjs';

describe('Fase 1: Configuración del consumidor Kafka', () => {
  let kafkaConsumerService: KafkaConsumerService;
  let orderEventHandler: OrderEventHandler;
  let mockKafkaClient: jest.Mocked<KafkaClientPort>;
  let mockOrderService: jest.Mocked<OrderServicePort>;
  let eventsSubject: Subject<OrderEvent>;

  beforeEach(async () => {
    eventsSubject = new Subject<OrderEvent>();

    mockKafkaClient = {
      consumeEvents: jest.fn().mockReturnValue(eventsSubject.asObservable()),
      connect: jest.fn().mockResolvedValue(undefined),
      disconnect: jest.fn().mockResolvedValue(undefined),
    };

    mockOrderService = {
      processOrderEvent: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KafkaConsumerService,
        OrderEventHandler,
        {
          provide: 'KafkaClientPort',
          useValue: mockKafkaClient,
        },
        {
          provide: 'OrderServicePort',
          useValue: mockOrderService,
        },
      ],
    }).compile();

    kafkaConsumerService = module.get<KafkaConsumerService>(KafkaConsumerService);
    orderEventHandler = module.get<OrderEventHandler>(OrderEventHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('KafkaConsumerService', () => {
    describe('Consumes messages from Kafka topic', () => {
      it('debería invocar el callback onMessage para cada mensaje recibido', async () => {
        const onMessageMock = jest.fn().mockResolvedValue(undefined);
        const testTopic = 'test-orders';
        
        await kafkaConsumerService.subscribe(testTopic, onMessageMock);

        const testEvent = new OrderEvent(
          'evt-001',
          'order-123',
          'CREATED',
          new Date().toISOString()
        );
        
        eventsSubject.next(testEvent);
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        expect(onMessageMock).toHaveBeenCalledTimes(1);
        expect(onMessageMock).toHaveBeenCalledWith(
          expect.objectContaining({
            value: expect.any(String),
            key: 'order-123',
          })
        );
      });
    });

    describe('Handles connection errors', () => {
      it('debería invocar el handler de error cuando el broker no está disponible', async () => {
        const onMessageMock = jest.fn().mockResolvedValue(undefined);
        const testTopic = 'test-orders';
        
        mockKafkaClient.connect.mockRejectedValue(new Error('Connection refused'));
        
        await expect(
          kafkaConsumerService.subscribe(testTopic, onMessageMock)
        ).rejects.toThrow('Connection refused');
      });
    });

    describe('Handles invalid messages', () => {
      it('debería manejar errores cuando llega un mensaje inválido', async () => {
        const onMessageMock = jest.fn().mockRejectedValue(new Error('Invalid message format'));
        const testTopic = 'test-orders';
        
        await kafkaConsumerService.subscribe(testTopic, onMessageMock);
        
        const invalidEvent = new OrderEvent(
          '',
          '',
          '',
          'invalid-timestamp'
        );
        
        eventsSubject.next(invalidEvent);
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        expect(onMessageMock).toHaveBeenCalled();
      });
    });
  });

  describe('OrderEventHandler', () => {
    describe('Processes valid order event', () => {
      it('debería llamar a OrderServicePort con los datos del evento', async () => {
        const validEvent = new OrderEvent(
          'evt-001',
          'order-123',
          'CREATED',
          new Date().toISOString()
        );

        await orderEventHandler.handleOrderEvent(validEvent);

        expect(mockOrderService.processOrderEvent).toHaveBeenCalledTimes(1);
        expect(mockOrderService.processOrderEvent).toHaveBeenCalledWith(validEvent);
      });
    });

    describe('Rejects invalid order event', () => {
      it('debería lanzar error y no llamar al servicio cuando el evento es inválido', async () => {
        const invalidEvent = new OrderEvent(
          '',
          'order-123',
          'CREATED',
          new Date().toISOString()
        );

        await expect(
          orderEventHandler.handleOrderEvent(invalidEvent)
        ).rejects.toThrow('Invalid order event');

        expect(mockOrderService.processOrderEvent).not.toHaveBeenCalled();
      });

      it('debería rechazar evento con timestamp inválido', async () => {
        const invalidEvent = new OrderEvent(
          'evt-001',
          'order-123',
          'CREATED',
          'not-a-valid-date'
        );

        await expect(
          orderEventHandler.handleOrderEvent(invalidEvent)
        ).rejects.toThrow();

        expect(mockOrderService.processOrderEvent).not.toHaveBeenCalled();
      });

      it('debería rechazar evento sin orderId', async () => {
        const invalidEvent = new OrderEvent(
          'evt-001',
          '',
          'CREATED',
          new Date().toISOString()
        );

        await expect(
          orderEventHandler.handleOrderEvent(invalidEvent)
        ).rejects.toThrow();

        expect(mockOrderService.processOrderEvent).not.toHaveBeenCalled();
      });
    });

    describe('validateEvent', () => {
      it('debería validar correctamente un evento válido', () => {
        const validEvent = new OrderEvent(
          'evt-001',
          'order-123',
          'CREATED',
          new Date().toISOString()
        );

        const result = orderEventHandler.validateEvent(validEvent);

        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it('debería detectar múltiples errores en un evento inválido', () => {
        const invalidEvent = new OrderEvent(
          '',
          '',
          '',
          ''
        );

        const result = orderEventHandler.validateEvent(invalidEvent);

        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThanOrEqual(3);
      });
    });
  });
});