import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderEventService } from '../../core/services/order-event.service';
import { OrderEvent } from '../../shared/models/order-event.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  private readonly orderEventService = inject(OrderEventService);
  
  readonly isConnected = this.orderEventService.isConnected;
  readonly connectionStatus = this.orderEventService.connectionStatus;
  readonly events = this.orderEventService.orderEventSignal.events;
  readonly lastEvent = this.orderEventService.orderEventSignal.lastEvent;

  private unsubscribe: (() => void) | null = null;

  ngOnInit(): void {
    this.unsubscribe = this.orderEventService.subscribeToOrderEvents(
      (event: OrderEvent) => {
        console.log('Nuevo evento recibido:', event);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  clearEvents(): void {
    this.orderEventService.clearEvents();
  }
}