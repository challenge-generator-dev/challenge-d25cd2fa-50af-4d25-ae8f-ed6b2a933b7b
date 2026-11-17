# Implementación de servidor para consumir eventos Kafka y reflejar en la UI

El sistema debe publicar y consumir eventos en un topic Kafka y mostrarlos en tiempo real en la interfaz de usuario. El estado de cada orden se actualiza en la UI sin recargar la página y las pruebas de aceptación lo verifican. El consumidor de eventos debe usar kafkajs 2 y el cliente recibe los eventos por Server-Sent Events (text/event-stream).

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Consumo de eventos en tiempo real con Kafka |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Tener el proyecto base del reto funcionando en tu máquina: clonar el repositorio, instalar las herramientas y verificar que compila y arranca antes de empezar a practicar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Instala las herramientas para ejecutar el proyecto: Node.js 18+ y npm.
- Clona el repositorio del reto (el enlace viene en la entrega del reto y en la sección "Repositorio del Proyecto" del PDF) y ábrelo en tu IDE.
- Instala las dependencias y compila ejecutando `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && docker compose config -q` en la raíz del repositorio.
- Confirma que el comando termina sin errores: el proyecto arranca y sus pruebas corren.
- Ubica los archivos de práctica: son los que contienen `TODO(reto)` (búscalos en el repositorio). Lee el README.md y el AGENTS.md antes de empezar.

**Entregable:** El proyecto compila/arranca sin errores con `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && docker compose config -q`.

<details>
<summary>Pistas de conocimiento</summary>

- Los archivos con `TODO(reto)` son el ejercicio: el resto del repositorio ya está resuelto y no hace falta tocarlo.
- Si el comando de verificación falla, revisa la versión de las herramientas instaladas antes de modificar código.
- AGENTS.md describe el reto, el comando de verificación y las reglas del repositorio.

</details>

### Fase 1: Configuración del consumidor Kafka

**Objetivo:** Configurar y probar el consumidor Kafka para recibir eventos en tiempo real.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configura el consumidor Kafka usando kafkajs 2.
- Verifica que el consumidor pueda recibir eventos del topic Kafka.
- Implementa la lógica para procesar los eventos recibidos.

**Entregable:** Consumidor Kafka configurado y probado.

<details>
<summary>Pistas de conocimiento</summary>

- Revisa la documentación de kafkajs para configurar el consumidor.
- Usa pruebas unitarias para verificar el funcionamiento del consumidor.

</details>

### Fase 2: Envío de eventos a la UI

**Objetivo:** Enviar los eventos recibidos por Kafka a la UI usando Server-Sent Events.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Configura el servidor para enviar eventos a la UI usando Server-Sent Events.
- Verifica que la UI reciba los eventos y actualice el estado de las órdenes sin recargar la página.
- Implementa las pruebas de aceptación para verificar que la UI actualice el estado de las órdenes correctamente.

**Entregable:** Servidor configurado para enviar eventos a la UI y pruebas de aceptación implementadas.

<details>
<summary>Pistas de conocimiento</summary>

- Revisa la documentación de Angular para configurar el envío de eventos a la UI.
- Usa pruebas de aceptación para verificar que la UI actualice el estado de las órdenes correctamente.

</details>

### Fase 3: Optimización y refactorización

**Objetivo:** Optimizar y refactorizar el código para mejorar la eficiencia y mantenibilidad.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Refactorizar el consumidor Kafka para separar la lógica de conexión y consumo en módulos reutilizables.
- Optimizar el envío de eventos a la UI para evitar cuellos de botella.
- Asegurar que las pruebas de aceptación cubran los casos de error y borde después de la refactorización.

**Entregable:** Código optimizado y refactorizado con pruebas de aceptación que validan el comportamiento antes y después.

<details>
<summary>Pistas de conocimiento</summary>

- Revisa las mejores prácticas de optimización y refactorización.
- Usa pruebas unitarias y de integración para verificar que el sistema continúe funcionando correctamente después de las mejoras.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es un consumidor Kafka y cómo se configura usando kafkajs 2?
- **paraQueSirve**: ¿Para qué sirve enviar eventos a la UI usando Server-Sent Events?
- **comoSeUsa**: ¿Cómo se usa kafkajs 2 para configurar el consumidor Kafka?
- **erroresComunes**: ¿Cuáles son los errores comunes al configurar el consumidor Kafka y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica la optimización y refactorización del código?

## Criterios de Evaluacion

- Configuración del consumidor Kafka usando kafkajs 2.
- Envío de eventos a la UI usando Server-Sent Events.
- Actualización del estado de las órdenes en la UI sin recargar la página.
- Implementación de pruebas de aceptación para verificar el funcionamiento del sistema.
- Optimización y refactorización del código.

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

## Pruebas de aceptacion

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

## Restricciones del pedido

| Restriccion | Donde se cumple | Estado |
|-------------|-----------------|--------|
| Usar kafkajs 2 para el consumidor de eventos (dependencia kafkajs en package.json) | chequeo estatico (manifest): exige `kafkajs` | Verificada |
| No usar socket.io; el cliente recibe los eventos por Server-Sent Events (text/event-stream) | chequeo estatico (code): exige `text/event-stream`; prohibe `socket.io` | Verificada |
| El estado de cada orden se actualiza en la UI sin recargar la pagina y las pruebas de aceptacion lo verifican | sin ubicar | Restriccion no verificada en sin ubicar |

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
