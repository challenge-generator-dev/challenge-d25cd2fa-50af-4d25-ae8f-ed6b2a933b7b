# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `api/src/infrastructure/adapters/kafka/kafka-consumer.service.ts` — La pieza p1 (Configuración y manejo de consumidores Kafka con kafkajs, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/application/services/order-event.handler.ts` — La pieza p2 (Procesamiento de eventos de orden desde Kafka, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/infrastructure/controllers/sse.controller.ts` — La pieza p3 (Envío de eventos a la UI mediante Server-Sent Events, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- `client/src/app/core/services/order-event.service.ts` — La pieza p4 (Suscripción y manejo de eventos en tiempo real en Angular, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | Apache Kafka |
| `client` | `client/` | chapter, support | client | Angular | Angular |
| `infra-local` | (raiz) | support | infra | Compose local | Apache Kafka |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install --no-audit --no-fund && npm run build` — componente `api` (practice).
3. `cd client && npm install --no-audit --no-fund && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `GET /orders/events`
- `client` expone http (api: http://localhost:3000):
  - `GET /orders/events`

## Como saber que terminaste

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Advanced L2

### Brecha de conocimiento
Publicar y consumir eventos en un topic Kafka y mostrarlos en tiempo real

### Misión / candidato
Mostrar en vivo el estado de las ordenes

### Reto
- Tema: Consumo de eventos en tiempo real con Kafka
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de servidor para consumir eventos Kafka y reflejar en la UI
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del consumidor Kafka — objetivo: Configurar y probar el consumidor Kafka para recibir eventos en tiempo real. — entregable (NO resolver): Consumidor Kafka configurado y probado.
- Fase 2: Envío de eventos a la UI — objetivo: Enviar los eventos recibidos por Kafka a la UI usando Server-Sent Events. — entregable (NO resolver): Servidor configurado para enviar eventos a la UI y pruebas de aceptación implementadas.
- Fase 3: Optimización y refactorización — objetivo: Optimizar y refactorizar el código para mejorar la eficiencia y mantenibilidad. — entregable (NO resolver): Código optimizado y refactorizado con pruebas de aceptación que validan el comportamiento antes y después.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "reto-nest",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest"
  },
  "dependencies": {
    "@nestjs/common": "10.4.22",
    "@nestjs/config": "4.0.4",
    "@nestjs/core": "10.4.22",
    "@nestjs/platform-express": "10.4.22",
    "@nestjs/testing": "10.4.22",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "express": "5.3.0",
    "kafkajs": "2.2.4",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.2"
  },
  "devDependencies": {
    "@types/express": "4.17.25",
    "@types/node": "22.20.5",
    "typescript": "5.7.3",
    "jest": "29.7.0",
    "ts-jest": "29.2.5",
    "@types/jest": "29.5.14"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "types": [
      "node",
      "jest"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: api/src/domain/ports/kafka-client.port.ts ===
import { Observable } from 'rxjs';
import { OrderEvent } from '../models/order-event.model';

export interface KafkaClientPort {
  consumeEvents(topic: string): Observable<OrderEvent>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

// === ARCHIVO: api/src/domain/ports/order-service.port.ts ===
import { OrderEvent } from '../models/order-event.model';

export interface OrderServicePort {
  processOrderEvent(event: OrderEvent): Promise<void>;
}

// === ARCHIVO: api/src/domain/models/order-event.model.ts ===
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

// === ARCHIVO: api/src/infrastructure/adapters/sse/sse.service.ts ===
import { Injectable, Logger } from '@nestjs/common';
import { Observable, Subject, filter, map, share } from 'rxjs';
import { OrderEvent } from '../../../domain/models/order-event.model';

@Injectable()
export class SseService {
  private readonly logger = new Logger(SseService.name);
  private readonly eventSubject = new Subject<OrderEvent>();
  private readonly sharedEvents$: Observable<OrderEvent>;

  constructor() {
    this.sharedEvents$ = this.eventSubject.asObservable().pipe(
      share(),
    );
  }

  emitOrderEvent(event: OrderEvent): void {
    if (!event || !event.id || !event.orderId) {
      this.logger.warn('Intento de emitir evento inválido', event);
      return;
    }

    try {
      this.eventSubject.next(event);
      this.logger.debug(`Evento emitido: ${event.id} - Estado: ${event.status}`);
    } catch (error) {
      this.logger.error('Error al emitir evento', error);
    }
  }

  getOrderEvents(): Observable<OrderEvent> {
    return this.sharedEvents$;
  }

  getEventsByStatus(status: string): Observable<OrderEvent> {
    return this.sharedEvents$.pipe(
      filter((event) => event.status === status),
    );
  }

  getEventsByOrderId(orderId: string): Observable<OrderEvent> {
    return this.sharedEvents$.pipe(
      filter((event) => event.orderId === orderId),
    );
  }

  transformEvents<T>(transformFn: (event: OrderEvent) => T): Observable<T> {
    return this.sharedEvents$.pipe(
      map(transformFn),
    );
  }

  close(): void {
    this.eventSubject.complete();
    this.logger.log('SSE Service cerrado - Subject completado');
  }
}

// === ARCHIVO: api/src/infrastructure/adapters/kafka/kafka-consumer.service.ts ===
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

// === ARCHIVO: api/src/application/services/order-event.handler.ts ===
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

// === ARCHIVO: api/src/infrastructure/controllers/sse.controller.ts ===
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

// === ARCHIVO: api/src/acceptance/f1.test.ts ===
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

// === ARCHIVO: api/src/acceptance/f2.test.ts ===
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

// === ARCHIVO: api/src/infrastructure/ports/order-event-handler.port.ts ===
import { OrderEvent } from '../../domain/models/order-event.model';

export interface OrderEventHandlerPort {
  handleOrderEvent(event: OrderEvent): Promise<void>;
  validateEvent(event: OrderEvent): { isValid: boolean; errors: string[] };
}

// === ARCHIVO: api/src/infrastructure/adapters/order/order.service.ts ===
import { Injectable, Logger } from '@nestjs/common';
import { OrderServicePort } from '../../../domain/ports/order-service.port';
import { OrderEvent } from '../../../domain/models/order-event.model';

@Injectable()
export class OrderService implements OrderServicePort {
  private readonly logger = new Logger(OrderService.name);

  async processOrderEvent(event: OrderEvent): Promise<void> {
    this.logger.log(`Processing order event: ${event.id} for order ${event.orderId}`);
    
    try {
      const eventData = event.toJSON();
      this.logger.debug(`Order ${eventData.orderId} status: ${eventData.status} at ${eventData.timestamp}`);
      
      await this.persistOrderEvent(event);
      
      this.logger.log(`Successfully processed order event: ${event.id}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to process order event: ${errorMessage}`, errorStack);
      throw error;
    }
  }

  private async persistOrderEvent(event: OrderEvent): Promise<void> {
    this.logger.debug(`Persisting order event ${event.id} to data store`);
    
    await this.simulatePersistence(event);
  }

  private async simulatePersistence(event: OrderEvent): Promise<void> {
    const persistenceData = {
      id: event.id,
      orderId: event.orderId,
      status: event.status,
      timestamp: event.timestamp,
      persistedAt: new Date().toISOString(),
    };
    
    this.logger.debug(`Persistence payload: ${JSON.stringify(persistenceData)}`);
  }

  async getOrderById(orderId: string): Promise<OrderEvent | null> {
    this.logger.debug(`Retrieving order: ${orderId}`);
    
    if (!orderId || orderId.trim() === '') {
      return null;
    }
    
    return null;
  }

  async getOrdersByStatus(status: string): Promise<OrderEvent[]> {
    this.logger.debug(`Retrieving orders with status: ${status}`);
    
    if (!status || status.trim() === '') {
      return [];
    }
    
    return [];
  }

  async getAllOrders(): Promise<OrderEvent[]> {
    this.logger.debug('Retrieving all orders');
    return [];
  }
}

// === ARCHIVO: api/src/app.module.ts ===
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

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';

  await app.listen(port, host);
  console.log(`Servidor NestJS escuchando en http://${host}:${port}`);
  console.log(`Endpoint SSE: GET /orders/events`);
}

bootstrap();

// === ARCHIVO: client/src/app/app.component.ts ===
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: []
})
export class AppComponent {}

// === ARCHIVO: client/package.json ===
{
  "name": "reto-angular",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "ng": "ng",
    "build": "ng build"
  },
  "dependencies": {
    "@angular/animations": "19.2.25",
    "@angular/common": "19.2.25",
    "@angular/compiler": "19.2.25",
    "@angular/core": "19.2.25",
    "@angular/forms": "19.2.25",
    "@angular/platform-browser": "19.2.25",
    "@angular/platform-browser-dynamic": "19.2.25",
    "@angular/router": "19.2.25",
    "rxjs": "7.8.2",
    "tslib": "2.9.1",
    "zone.js": "0.15.1"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "19.2.27",
    "@angular/cli": "19.2.27",
    "@angular/compiler-cli": "19.2.25",
    "typescript": "5.7.3"
  }
}

// === ARCHIVO: client/angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": {
    "analytics": false
  },
  "newProjectRoot": "projects",
  "projects": {
    "reto": {
      "projectType": "application",
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/reto",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "assets": [],
            "styles": [
              "src/styles.css"
            ]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "1MB",
                  "maximumError": "2MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "16kB",
                  "maximumError": "32kB"
                }
              ],
              "outputHashing": "all"
            }
          },
          "defaultConfiguration": "production"
        }
      }
    }
  }
}

// === ARCHIVO: client/tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "strict": true,
    "strictPropertyInitialization": false,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": false,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "lib": [
      "ES2022",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}

// === ARCHIVO: client/tsconfig.app.json ===
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ],
  "exclude": [
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: client/src/index.html ===
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Reto</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <app-root></app-root>
</body>
</html>

// === ARCHIVO: client/src/styles.css ===
/* estilos globales */

// === ARCHIVO: client/src/main.ts ===
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

// === ARCHIVO: client/src/app/shared/models/order-event.model.ts ===
/**
 * Modelo de datos para eventos de orden.
 * Representa un evento emitido por el sistema de órdenes, como cambios de estado.
 */
export interface OrderEvent {
    /**
     * Identificador único del evento.
     */
    id: string;

    /**
     * Identificador único de la orden asociada al evento.
     */
    orderId: string;

    /**
     * Estado actual de la orden en el momento del evento.
     * Ejemplos: 'CREATED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'.
     */
    status: string;

    /**
     * Marca de tiempo del evento en formato ISO 8601.
     */
    timestamp: string;
}

// Señales para manejo reactivo del estado de eventos
export type OrderEventSignal = {
    /**
     * Señal que contiene el último evento recibido.
     */
    lastEvent: OrderEvent | null;

    /**
     * Señal que contiene la lista de todos los eventos recibidos.
     */
    events: OrderEvent[];
};

// === ARCHIVO: client/src/app/core/services/order-event.service.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, signal, computed } from '@angular/core';
import { OrderEvent, OrderEventSignal } from '../../shared/models/order-event.model';

@Injectable({
    providedIn: 'root'
})
export class OrderEventService {
    private readonly baseUrl = 'http://localhost:3000';
    private eventSource: EventSource | null = null;
    private reconnectAttempts = 0;
    private readonly maxReconnectAttempts = 5;
    private readonly reconnectDelay = 3000;

    private readonly _lastEvent = signal<OrderEvent | null>(null);
    private readonly _events = signal<OrderEvent[]>([]);
    private readonly _connectionStatus = signal<'connected' | 'disconnected' | 'error'>('disconnected');

    readonly orderEventSignal: OrderEventSignal = {
        lastEvent: this._lastEvent.asReadonly(),
        events: this._events.asReadonly()
    };

    readonly isConnected = computed(() => this._connectionStatus() === 'connected');
    readonly connectionStatus = this._connectionStatus.asReadonly();

    subscribeToOrderEvents(callback: (event: OrderEvent) => void): () => void {
      throw new Error('TODO(reto): subscribeToOrderEvents');
    }

    private connect(callback: (event: OrderEvent) => void): void {
        if (this.eventSource) {
            this.eventSource.close();
        }

        try {
            this.eventSource = new EventSource(`${this.baseUrl}/orders/events`);
            this._connectionStatus.set('connected');
            this.reconnectAttempts = 0;

            this.eventSource.onmessage = (event) => {
                try {
                    const parsedEvent: OrderEvent = JSON.parse(event.data);
                    this.handleEvent(parsedEvent, callback);
                } catch (parseError) {
                    console.error('[OrderEventService] Error parsing event data:', parseError);
                }
            };

            this.eventSource.onerror = (error) => {
                console.error('[OrderEventService] SSE connection error:', error);
                this._connectionStatus.set('error');
                this.handleReconnect(callback);
            };

            this.eventSource.onopen = () => {
                console.log('[OrderEventService] SSE connection established');
                this._connectionStatus.set('connected');
            };
        } catch (error) {
            console.error('[OrderEventService] Failed to create EventSource:', error);
            this._connectionStatus.set('error');
            this.handleReconnect(callback);
        }
    }

    private handleEvent(event: OrderEvent, callback: (event: OrderEvent) => void): void {
      throw new Error('TODO(reto): handleEvent');
    }

    private handleReconnect(callback: (event: OrderEvent) => void): void {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('[OrderEventService] Max reconnection attempts reached');
            this._connectionStatus.set('error');
            return;
        }

        this.reconnectAttempts++;
        console.log(`[OrderEventService] Attempting reconnection ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);

        setTimeout(() => {
            this.connect(callback);
        }, this.reconnectDelay);
    }

    private disconnect(): void {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
            this._connectionStatus.set('disconnected');
            console.log('[OrderEventService] SSE connection closed');
        }
    }

    clearEvents(): void {
        this._events.set([]);
        this._lastEvent.set(null);
    }

    getLastEvent(): OrderEvent | null {
        return this._lastEvent();
    }

    getAllEvents(): OrderEvent[] {
        return this._events();
    }
}

// === ARCHIVO: client/src/app/features/orders/orders.component.ts ===
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

// === ARCHIVO: client/src/app/features/orders/orders.component.html ===
<div class="orders-container">
  <header class="orders-header">
    <h1 class="orders-header__title">Eventos de Órdenes</h1>
    <div class="orders-header__status">
      <span 
        class="orders-header__indicator"
        [class.orders-header__indicator--connected]="this.isConnected()"
        [class.orders-header__indicator--disconnected]="!this.isConnected()">
      </span>
      <span class="orders-header__status-text">
        {{ this.isConnected() ? 'Conectado' : 'Desconectado' }}
      </span>
    </div>
  </header>

  <section class="orders-actions">
    <button 
      type="button" 
      class="orders-actions__button orders-actions__button--clear"
      (click)="clearEvents()"
      [disabled]="this.events().length === 0">
      Limpiar Eventos
    </button>
  </section>

  <section class="orders-last-event" *ngIf="this.lastEvent()">
    <h2 class="orders-last-event__title">Último Evento</h2>
    <div class="orders-last-event__card">
      <div class="orders-last-event__field">
        <span class="orders-last-event__label">ID:</span>
        <span class="orders-last-event__value">{{ this.lastEvent()?.id }}</span>
      </div>
      <div class="orders-last-event__field">
        <span class="orders-last-event__label">Orden:</span>
        <span class="orders-last-event__value">{{ this.lastEvent()?.orderId }}</span>
      </div>
      <div class="orders-last-event__field">
        <span class="orders-last-event__label">Estado:</span>
        <span class="orders-last-event__value orders-last-event__value--status">
          {{ this.lastEvent()?.status }}
        </span>
      </div>
      <div class="orders-last-event__field">
        <span class="orders-last-event__label">Timestamp:</span>
        <span class="orders-last-event__value">{{ this.lastEvent()?.timestamp | date:'medium' }}</span>
      </div>
    </div>
  </section>

  <section class="orders-list">
    <h2 class="orders-list__title">
      Historial de Eventos 
      <span class="orders-list__count">({{ this.events().length }})</span>
    </h2>
    
    <div class="orders-list__empty" *ngIf="this.events().length === 0">
      <p class="orders-list__empty-text">No hay eventos recibidos</p>
      <p class="orders-list__empty-hint">Conectando al servidor de eventos...</p>
    </div>

    <ul class="orders-list__items" *ngIf="this.events().length > 0">
      <li 
        class="orders-list__item" 
        *ngFor="let event of this.events(); trackBy: trackByEventId">
        <div class="orders-list__item-content">
          <div class="orders-list__item-header">
            <span class="orders-list__item-id">{{ event.orderId }}</span>
            <span class="orders-list__item-status">{{ event.status }}</span>
          </div>
          <div class="orders-list__item-meta">
            <span class="orders-list__item-timestamp">{{ event.timestamp | date:'short' }}</span>
            <span class="orders-list__item-event-id">{{ event.id }}</span>
          </div>
        </div>
      </li>
    </ul>
  </section>
</div>

// === ARCHIVO: client/src/app/features/orders/orders.component.scss ===
.orders-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

.orders-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;

  &__title {
    font-size: 28px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
  }

  &__status {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transition: background-color 0.3s ease;

    &--connected {
      background-color: #22c55e;
      box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
    }

    &--disconnected {
      background-color: #ef4444;
      box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
    }
  }

  &__status-text {
    font-size: 14px;
    color: #666;
  }
}

.orders-actions {
  margin-bottom: 24px;

  &__button {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    &--clear {
      background-color: #f3f4f6;
      color: #374151;

      &:hover:not(:disabled) {
        background-color: #e5e7eb;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}

.orders-last-event {
  margin-bottom: 32px;

  &__title {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 12px 0;
  }

  &__card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    padding: 20px;
    color: white;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  &__field {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    &:last-child {
      border-bottom: none;
    }
  }

  &__label {
    font-weight: 500;
    opacity: 0.9;
  }

  &__value {
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 14px;

    &--status {
      background-color: rgba(255, 255, 255, 0.2);
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 600;
    }
  }
}

.orders-list {
  &__title {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 16px 0;
  }

  &__count {
    font-weight: 400;
    color: #666;
    font-size: 14px;
  }

  &__empty {
    text-align: center;
    padding: 48px 24px;
    background-color: #f9fafb;
    border-radius: 8px;
    border: 2px dashed #e5e7eb;

    &-text {
      font-size: 16px;
      color: #374151;
      margin: 0 0 8px 0;
    }

    &-hint {
      font-size: 14px;
      color: #9ca3af;
      margin: 0;
    }
  }

  &__items {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    margin-bottom: 12px;
    transition: box-shadow 0.2s ease, transform 0.2s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transform: translateY(-1px);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__item-content {
    padding: 16px;
  }

  &__item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  &__item-id {
    font-weight: 600;
    color: #1a1a1a;
    font-size: 15px;
  }

  &__item-status {
    background-color: #dbeafe;
    color: #1d4ed8;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
  }

  &__item-meta {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #9ca3af;
  }

  &__item-event-id {
    font-family: 'Monaco', 'Menlo', monospace;
  }
}

// === ARCHIVO: client/src/app/shared/components/order-status/order-status.component.ts ===
import { Component, Input, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderEvent } from '../../models/order-event.model';

/**
 * Componente presentacional que muestra el estado de una orden.
 * Renderiza la información del evento de orden de forma visual con indicadores de estado.
 */
@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent {
  private readonly _orderEvent = signal<OrderEvent | null>(null);

  /**
   * Evento de orden a mostrar.
   */
  @Input()
  set orderEvent(value: OrderEvent | null) {
    this._orderEvent.set(value);
  }

  get orderEvent(): OrderEvent | null {
    return this._orderEvent();
  }

  /**
   * Estado actual de la orden formateado para visualización.
   */
  readonly displayStatus = computed(() => {
    const event = this._orderEvent();
    if (!event) {
      return 'Sin datos';
    }
    return this.formatStatus(event.status);
  });

  /**
   * Clase CSS asociada al estado de la orden.
   */
  readonly statusClass = computed(() => {
    const event = this._orderEvent();
    if (!event) {
      return 'status-unknown';
    }
    return this.getStatusClass(event.status);
  });

  /**
   * Indicador visual de si el estado representa una orden activa.
   */
  readonly isActive = computed(() => {
    const event = this._orderEvent();
    if (!event) {
      return false;
    }
    return this.isActiveStatus(event.status);
  });

  /**
   * Indicador visual de si el estado representa una orden completada.
   */
  readonly isCompleted = computed(() => {
    const event = this._orderEvent();
    if (!event) {
      return false;
    }
    return event.status === 'DELIVERED';
  });

  /**
   * Indicador visual de si el estado representa una orden cancelada.
   */
  readonly isCancelled = computed(() => {
    const event = this._orderEvent();
    if (!event) {
      return false;
    }
    return event.status === 'CANCELLED';
  });

  /**
   * Formatea la marca de tiempo para visualización legible.
   */
  readonly formattedTimestamp = computed(() => {
    const event = this._orderEvent();
    if (!event || !event.timestamp) {
      return '—';
    }
    return this.formatTimestamp(event.timestamp);
  });

  /**
   * Formatea el ID de la orden para mostrar de forma abreviada.
   */
  readonly shortOrderId = computed(() => {
    const event = this._orderEvent();
    if (!event || !event.orderId) {
      return '—';
    }
    return event.orderId.substring(0, 8).toUpperCase();
  });

  /**
   * Convierte el estado raw a un formato legible.
   */
  private formatStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'CREATED': 'Creada',
      'PROCESSING': 'Procesando',
      'SHIPPED': 'Enviada',
      'DELIVERED': 'Entregada',
      'CANCELLED': 'Cancelada'
    };
    return statusMap[status] || status;
  }

  /**
   * Retorna la clase CSS correspondiente al estado.
   */
  private getStatusClass(status: string): string {
    const classMap: Record<string, string> = {
      'CREATED': 'status-created',
      'PROCESSING': 'status-processing',
      'SHIPPED': 'status-shipped',
      'DELIVERED': 'status-delivered',
      'CANCELLED': 'status-cancelled'
    };
    return classMap[status] || 'status-unknown';
  }

  /**
   * Determina si el estado representa una orden activa.
   */
  private isActiveStatus(status: string): boolean {
    return ['CREATED', 'PROCESSING', 'SHIPPED'].includes(status);
  }

  /**
   * Formatea la marca de tiempo ISO a formato local legible.
   */
  private formatTimestamp(isoString: string): string {
    try {
      const date = new Date(isoString);
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      return date.toLocaleDateString('es-ES', options);
    } catch {
      return isoString;
    }
  }
}

// === ARCHIVO: client/src/app/shared/components/order-status/order-status.component.html ===
@if (orderEvent) {
  <div class="order-status" [ngClass]="statusClass()">
    <div class="order-status__header">
      <span class="order-status__id">Orden #{{ shortOrderId() }}</span>
      <span class="order-status__badge" [ngClass]="statusClass()">
        {{ displayStatus() }}
      </span>
    </div>
    
    <div class="order-status__details">
      <div class="order-status__detail">
        <span class="order-status__label">ID Completo:</span>
        <span class="order-status__value order-status__value--id">{{ orderEvent.orderId }}</span>
      </div>
      
      <div class="order-status__detail">
        <span class="order-status__label">Evento ID:</span>
        <span class="order-status__value">{{ orderEvent.id }}</span>
      </div>
      
      <div class="order-status__detail">
        <span class="order-status__label">Fecha:</span>
        <span class="order-status__value">{{ formattedTimestamp() }}</span>
      </div>
    </div>
    
    <div class="order-status__indicators">
      @if (isActive()) {
        <span class="order-status__indicator order-status__indicator--active">
          <span class="order-status__pulse"></span>
          En progreso
        </span>
      }
      
      @if (isCompleted()) {
        <span class="order-status__indicator order-status__indicator--completed">
          ✓ Completada
        </span>
      }
      
      @if (isCancelled()) {
        <span class="order-status__indicator order-status__indicator--cancelled">
          ✗ Cancelada
        </span>
      }
    </div>
  </div>
} @else {
  <div class="order-status order-status--empty">
    <div class="order-status__empty-message">
      <span class="order-status__empty-icon">📦</span>
      <span>No hay información de orden disponible</span>
    </div>
  </div>
}

// === ARCHIVO: client/src/app/app.config.ts ===
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideRouter([])
    ],
};

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  kafka:
    image: "apache/kafka:3.8.0"
    ports:
      - "127.0.0.1:9092:9092"
    environment:
      KAFKA_NODE_ID: "1"
      KAFKA_PROCESS_ROLES: "broker,controller"
      KAFKA_LISTENERS: "PLAINTEXT://:9092,CONTROLLER://:9093"
      KAFKA_ADVERTISED_LISTENERS: "PLAINTEXT://localhost:9092"
      KAFKA_CONTROLLER_LISTENER_NAMES: "CONTROLLER"
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: "CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT"
      KAFKA_CONTROLLER_QUORUM_VOTERS: "1@localhost:9093"
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: "1"
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: "1"
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: "1"
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: "0"
    healthcheck:
      test: ["CMD-SHELL","/opt/kafka/bin/kafka-broker-api-versions.sh --bootstrap-server localhost:9092 > /dev/null 2>&1"]
      interval: 15s
      timeout: 10s
      retries: 10
      start_period: 30s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| Apache Kafka (KRaft, un nodo) | `apache/kafka:3.8.0` | 9092 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/kafka/create-topics.sh ===
#!/usr/bin/env bash
# Crea los topics en Kafka local (idempotente). Ejecutar con el compose levantado y healthy.
set -euo pipefail

docker compose exec -T kafka /opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --if-not-exists --topic app-events --partitions 1 --replication-factor 1

```
