// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Controller, Get, Req, Res, HttpStatus, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, Subscription } from 'rxjs';
import { SseService } from '../adapters/sse/sse.service';
import { OrderEvent } from '../../domain/models/order-event.model';
import { OrderEventHandler } from '../../application/services/order-event.handler';

@Controller('orders')
export class SSEController {
  private readonly activeConnections: Map<string, Subscription> = new Map();

  constructor(
    private readonly sseService: SseService,
    private readonly orderEventHandler: OrderEventHandler,
  ) {}

  @Get('events')
  streamOrderEvents(@Req() req: Request, @Res() res: Response): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');

    const connectionId = `${req.ip}-${Date.now()}`;
    res.write('\n');

    const eventsObservable: Observable<OrderEvent> = this.sseService.getOrderEvents();
    
    const subscription = eventsObservable.subscribe({
      next: (event: OrderEvent) => {
        this.sendEvent(res, event);
      },
      error: (error: Error) => {
        this.handleError(res, error);
      },
    });

    this.activeConnections.set(connectionId, subscription);

    req.on('close', () => {
      this.handleClientDisconnection(connectionId, subscription);
    });
  }

  private sendEvent(res: Response, event: OrderEvent): void {
    throw new Error('TODO(reto): sendEvent');
  }

  private handleClientDisconnection(connectionId: string, subscription: Subscription): void {
    if (subscription && !subscription.closed) {
      subscription.unsubscribe();
    }
    this.activeConnections.delete(connectionId);
  }

  private handleError(res: Response, error: Error): void {
    const errorEvent = {
      type: 'error',
      message: error.message,
    };
    res.write(`data: ${JSON.stringify(errorEvent)}\n\n`);
    res.end();
  }
}