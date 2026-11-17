import { Test, TestingModule } from '@nestjs/testing';
import { SSEController } from '../infrastructure/controllers/sse.controller';
import { SseService } from '../infrastructure/adapters/sse/sse.service';
import { OrderEventHandler } from '../application/services/order-event.handler';
import { OrderEvent } from '../domain/models/order-event.model';
import { Subject } from 'rxjs';

class MockOrderEventHandler {
  handleOrderEvent = jest.fn().mockResolvedValue(undefined);
  validateEvent = jest.fn().mockReturnValue({ isValid: true, errors: [] });
}

describe('SSEController - f2', () => {
  let controller: SSEController;
  let sseService: jest.Mocked<SseService>;
  let mockResponse: Partial<Response>;
  let eventsSubject: Subject<OrderEvent>;

  beforeEach(async () => {
    eventsSubject = new Subject<OrderEvent>();

    const mockSseService = {
      getOrderEvents: jest.fn(),
      emitOrderEvent: jest.fn(),
    };
    mockSseService.getOrderEvents.mockReturnValue(eventsSubject.asObservable());

    mockResponse = {
      setHeader: jest.fn(),
      write: jest.fn(),
      end: jest.fn(),
      on: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SSEController],
      providers: [
        { provide: SseService, useValue: mockSseService },
        { provide: OrderEventHandler, useClass: MockOrderEventHandler },
      ],
    }).compile();

    controller = module.get<SSEController>(SSEController);
    sseService = module.get(SseService);
  });

  afterEach(() => {
    eventsSubject.complete();
    jest.clearAllMocks();
  });

  describe('Sends events to UI via SSE', () => {
    it('should send events to client in text/event-stream format', () => {
      const mockRequest = {
        ip: '127.0.0.1',
        on: jest.fn(),
      } as unknown as Request;

      const testEvent = new OrderEvent(
        'evt-001',
        'order-123',
        'PROCESSING',
        new Date().toISOString()
      );

      controller.streamOrderEvents(mockRequest, mockResponse as Response);

      eventsSubject.next(testEvent);

      expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'text/event-stream');
      expect(mockResponse.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-cache');
      expect(mockResponse.setHeader).toHaveBeenCalledWith('Connection', 'keep-alive');
      expect(mockResponse.write).toHaveBeenCalledWith(
        `data: ${JSON.stringify(testEvent.toJSON())}\n\n`
      );
    });
  });

  describe('Handles client disconnection', () => {
    it('should close SSE connection and clean up resources when client disconnects', () => {
      const closeCallback = jest.fn();
      const mockRequest = {
        ip: '127.0.0.1',
        on: jest.fn((event: string, callback: Function) => {
          if (event === 'close') {
            closeCallback(callback);
          }
        }),
      } as unknown as Request;

      controller.streamOrderEvents(mockRequest, mockResponse as Response);

      expect(mockRequest.on).toHaveBeenCalledWith('close', expect.any(Function));

      closeCallback();

      expect(mockResponse.end).toHaveBeenCalled();
    });
  });
});