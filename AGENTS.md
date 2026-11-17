# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de servidor para consumir eventos Kafka y reflejar en la UI**.

| | |
|---|---|
| Tema | Consumo de eventos en tiempo real con Kafka |
| Nivel | advanced-l2 |
| Chapter | Frontend |
| Especialidad | Node |
| Stack | TypeScript / NestJS 10 |
| Patron arquitectonico | hexagonal/clean |
| Tiempo estimado | 8 horas |

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

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `modulo raiz de Nest`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.2`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- @nestjs/common 10.4.22
- @nestjs/config 4.0.4
- @nestjs/core 10.4.22
- @nestjs/platform-express 10.4.22
- @nestjs/testing 10.4.22
- class-transformer 0.5.1
- class-validator 0.15.1
- express 5.3.0
- reflect-metadata 0.2.2
- rxjs 7.8.2
- @types/express 4.17.25
- @types/node 22.20.5
- typescript 5.7.3
- jest 29.7.0
- ts-jest 29.2.5
- @types/jest 29.5.14

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Segui el orden de arranque del mapa de componentes (infraestructura local primero) y corre `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && docker compose config -q` desde la raiz: mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && docker compose config -q` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración del consumidor Kafka**: Consumidor Kafka configurado y probado.
- **Fase 2 — Envío de eventos a la UI**: Servidor configurado para enviar eventos a la UI y pruebas de aceptación implementadas.
- **Fase 3 — Optimización y refactorización**: Código optimizado y refactorizado con pruebas de aceptación que validan el comportamiento antes y después.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `api/src/infrastructure/adapters/kafka/kafka-consumer.service.ts` — La pieza p1 (Configuración y manejo de consumidores Kafka con kafkajs, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `api/src/application/services/order-event.handler.ts` — La pieza p2 (Procesamiento de eventos de orden desde Kafka, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `api/src/infrastructure/controllers/sse.controller.ts` — La pieza p3 (Envío de eventos a la UI mediante Server-Sent Events, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `client/src/app/core/services/order-event.service.ts` — La pieza p4 (Suscripción y manejo de eventos en tiempo real en Angular, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).

## Mapa de fases

La **Fase 0** es clonar el repositorio, instalar dependencias y correr las pruebas de aceptacion: todas fallan porque la logica de cada pieza esta pendiente.

| Fase | Pieza (skill) | Archivo:simbolo | Criterios | Prueba | Comando |
|------|---------------|-----------------|-----------|--------|---------|
| f1 — Configuración del consumidor Kafka | Configuración y manejo de consumidores Kafka | `api/src/infrastructure/adapters/kafka/kafka-consumer.service.ts:KafkaConsumerService` | El consumidor Kafka está configurado y puede recibir eventos del topic especificado.; El consumidor maneja errores de conexión y reconexión automáticamente. | `api/src/acceptance/f1.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f1.test.ts` |
| f1 — Configuración del consumidor Kafka | Pruebas de integración para consumidores Kafka | `api/src/application/services/order-event.handler.ts:KafkaConsumerServiceTest` | El consumidor Kafka está configurado y puede recibir eventos del topic especificado.; El consumidor maneja errores de conexión y reconexión automáticamente. | `api/src/acceptance/f1.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f1.test.ts` |
| f2 — Envío de eventos a la UI | Envío de eventos a la UI mediante Server-Sent Events | `api/src/infrastructure/controllers/sse.controller.ts:OrderEventService.streamOrders` | Los eventos recibidos por Kafka son enviados a la UI mediante Server-Sent Events.; La UI muestra los eventos en tiempo real sin recargar la página. | `api/src/acceptance/f2.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f2.test.ts` |
| f2 — Envío de eventos a la UI | Exposición de endpoints SSE | `client/src/app/core/services/order-event.service.ts:OrderEventController.streamOrders` | Los eventos recibidos por Kafka son enviados a la UI mediante Server-Sent Events.; La UI muestra los eventos en tiempo real sin recargar la página. | `api/src/acceptance/f2.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f2.test.ts` |
| f2 — Envío de eventos a la UI | Consumo de eventos SSE en Angular | — | Los eventos recibidos por Kafka son enviados a la UI mediante Server-Sent Events.; La UI muestra los eventos en tiempo real sin recargar la página. | — | — |
| f3 — Optimización y refactorización | Optimización del envío de eventos SSE | — | El código refactorizado mantiene la funcionalidad original.; Las pruebas de aceptación validan que no hay regresiones. | — | — |

## Pruebas de aceptacion y ubicacion de la logica

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

La logica de cada pieza va en su archivo; no la muevas a otro.

## Restricciones del pedido

| Restriccion | Donde se cumple | Estado |
|-------------|-----------------|--------|
| Usar kafkajs 2 para el consumidor de eventos (dependencia kafkajs en package.json) | chequeo estatico (manifest): exige `kafkajs` | Verificada |
| No usar socket.io; el cliente recibe los eventos por Server-Sent Events (text/event-stream) | chequeo estatico (code): exige `text/event-stream`; prohibe `socket.io` | Verificada |
| El estado de cada orden se actualiza en la UI sin recargar la pagina y las pruebas de aceptacion lo verifican | sin ubicar | Restriccion no verificada en sin ubicar |

## Lo que falta y tenes que completar

No se detectaron huecos: estan los archivos declarados, el boilerplate del stack y ninguna referencia quedo colgando. Igual corre el comando de verificacion — que los archivos existan no garantiza que compilen.

### Presentes (34)

- `api/package.json`
- `api/tsconfig.json`
- `api/src/domain/ports/kafka-client.port.ts`
- `api/src/domain/ports/order-service.port.ts`
- `api/src/domain/models/order-event.model.ts`
- `api/src/infrastructure/adapters/sse/sse.service.ts`
- `api/src/infrastructure/adapters/kafka/kafka-consumer.service.ts`
- `api/src/application/services/order-event.handler.ts`
- `api/src/infrastructure/controllers/sse.controller.ts`
- `api/src/acceptance/f1.test.ts`
- `api/src/acceptance/f2.test.ts`
- `api/src/infrastructure/ports/order-event-handler.port.ts`
- `api/src/infrastructure/adapters/order/order.service.ts`
- `api/src/app.module.ts`
- `api/src/main.ts`
- `client/src/app/app.component.ts`
- `client/package.json`
- `client/angular.json`
- `client/tsconfig.json`
- `client/tsconfig.app.json`
- `client/src/index.html`
- `client/src/styles.css`
- `client/src/main.ts`
- `client/src/app/shared/models/order-event.model.ts`
- `client/src/app/core/services/order-event.service.ts`
- `client/src/app/features/orders/orders.component.ts`
- `client/src/app/features/orders/orders.component.html`
- `client/src/app/features/orders/orders.component.scss`
- `client/src/app/shared/components/order-status/order-status.component.ts`
- `client/src/app/shared/components/order-status/order-status.component.html`
- `client/src/app/app.config.ts`
- `docker-compose.yml`
- `infra-local/README.md`
- `infra-local/kafka/create-topics.sh`

### Capas del patron declarado

Son las capas que la propuesta arquitectonica plantea, marcadas segun existan hoy en el repo. Orientan donde poner el codigo nuevo; no son una condicion para compilar.

- `api` (presente)
- `api/src/domain/ports` (presente)
- `api/src/domain/models` (presente)
- `api/src/application/services` (presente)
- `api/src/infrastructure/adapters/kafka` (presente)
- `api/src/infrastructure/adapters/sse` (presente)
- `api/src/infrastructure/controllers` (presente)
- `api/src/config` (ausente)
- `api/test` (ausente)
- `client` (presente)
- `client/src/app/core/services` (presente)
- `client/src/app/features/orders` (presente)
- `client/src/app/shared/components` (presente)
- `client/src/app/shared/models` (presente)

## Verificacion

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && docker compose config -q
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- Cada componente vive en su carpeta: instala y compila dentro de ella, y no muevas archivos entre componentes.
- Respeta los contratos entre componentes (endpoints, topics) tal como estan declarados en el mapa de componentes.
- El patron es **hexagonal/clean**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Advanced L2
- Brecha que el reto ataca: Publicar y consumir eventos en un topic Kafka y mostrarlos en tiempo real
- Mision: Mostrar en vivo el estado de las ordenes

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
