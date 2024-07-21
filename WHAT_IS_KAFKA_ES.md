## Apache Kafka

Apache Kafka es una plataforma distribuida de transmisión de eventos diseñada para manejar flujos de datos de alta capacidad en tiempo real. Aquí tienes una breve descripción de sus características principales:

### 1. **Sistema de Mensajería Publicar-Suscribir:**

- **Producir y Consumir Mensajes:** Los productores envían mensajes a temas y los consumidores leen mensajes de temas.

### 2. **Procesamiento de Flujos en Tiempo Real:**

- **Procesamiento Continuo:** Procesa y analiza datos en tiempo real a medida que llegan.

### 3. **Almacenamiento Duradero:**

- **Persistencia:** Almacena mensajes de manera duradera, permitiendo a los consumidores leerlos cuando lo necesiten.

### 4. **Escalabilidad Horizontal:**

- **Distribución:** Escala horizontalmente al distribuir la carga de trabajo a través de múltiples servidores (brokers).

### 5. **Tolerancia a Fallos:**

- **Replicación:** Replica datos entre múltiples brokers para asegurar la disponibilidad y tolerancia a fallos.

### 6. **Integración:**

- **Conectores y APIs:** Proporciona APIs para la integración con múltiples sistemas y herramientas para conectarse a diversas fuentes y sumideros de datos.

## Zookeeper

Zookeeper es un servicio centralizado para mantener información de configuración, proporcionar servicios de nombramiento, sincronizar y proveer servicios de grupo en sistemas distribuidos. Aquí tienes una breve descripción de sus características principales:

### 1. **Coordinación de Sistemas Distribuidos:**

- **Configuración Centralizada:** Almacena y gestiona la configuración de múltiples aplicaciones distribuidas.
- **Sincronización:** Sincroniza datos entre nodos en sistemas distribuidos para asegurar consistencia.

### 2. **Servicios de Naming:**

- **Registro y Descubrimiento:** Permite que los servicios se registren y otros servicios descubran y accedan a ellos.

### 3. **Gestión de Estado:**

- **Datos en Forma de Árbol:** Utiliza un modelo jerárquico similar al sistema de archivos para almacenar datos.
- **Notificaciones de Cambios:** Notifica a los clientes sobre cambios en los datos, permitiendo respuestas rápidas a eventos.

### 4. **Tolerancia a Fallos:**

- **Alta Disponibilidad:** Diseñado para ser altamente disponible, replicando datos entre nodos del clúster.

### 5. **Simplitud en la Implementación:**

- **API Sencilla:** Proporciona una API sencilla para su uso, facilitando su integración en sistemas complejos.

## Topics

Configuración

### 1. **Número de Particiones (`num.partitions`)**

- **Descripción**: Define el número de particiones del topic. Cada partición es una unidad de paralelismo y almacenamiento.
- **Locales**: **1** (suficiente para pruebas, simplifica la gestión).
- **Producción**: **3 o más** (aumenta la paralelización y la tolerancia a fallos).

### 2. **Número de Réplicas (`replication.factor`)**

- **Descripción**: Define cuántas copias de cada partición deben existir en el clúster. Asegura la disponibilidad y durabilidad de los datos.
- **Locales**: **1** (no se necesita redundancia en un entorno de desarrollo local).
- **Producción**: **3** (para alta disponibilidad y tolerancia a fallos).

### 3. **Retención de Mensajes (`retention.ms`)**

- **Descripción**: El tiempo durante el cual los mensajes se mantienen en el topic. Después de este período, los mensajes serán eliminados.
- **Locales**: **7 días (604800000 ms)** (suficiente para pruebas).
- **Producción**: **7 días o más**, dependiendo de los requisitos de almacenamiento y cumplimiento.

### 4. **Tamaño Máximo de Mensaje (`max.message.bytes`)**

- **Descripción**: El tamaño máximo de un mensaje en bytes. Determina el límite superior del tamaño de los mensajes que pueden ser enviados al topic.
- **Locales**: **1 MB (1048576 bytes)** (suficiente para pruebas básicas).
- **Producción**: **10 MB o más** (ajustar según las necesidades específicas de datos).

### 5. **Configuración de Log Cleanup (`cleanup.policy`)**

- **Descripción**: Define cómo se deben limpiar los logs del topic. Puede ser basado en tiempo (`delete`) o en tamaño (`compact`).
- **Locales**: **delete** (borrado por tiempo, útil para pruebas).
- **Producción**: **delete** o **compact** (compacción para datos de tipo clave-valor o borrado para logs de eventos).

### 6. **Minimizar la Confirmación (`acks`)**

- **Descripción**: Define el número de réplicas que deben confirmar la recepción de un mensaje antes de que el productor lo considere enviado con éxito.
- **Locales**: **1** (suficiente para pruebas, menor latencia).
- **Producción**: **all** (garantiza que el mensaje se haya replicado en todas las réplicas, mayor durabilidad).

### 7. **Tiempo de Espera para la Confirmación (`request.timeout.ms`)**

- **Descripción**: El tiempo máximo que el productor esperará para recibir una confirmación del broker.
- **Locales**: **30 segundos (30000 ms)** (ajustado para un entorno de desarrollo).
- **Producción**: **60 segundos (60000 ms) o más** (ajustar según la tolerancia a fallos).

### 8. **Buffer de Mensajes (`message.max.bytes` y `replica.fetch.max.bytes`)**

- **Descripción**: Tamaño máximo de mensajes que un broker puede recibir y el tamaño máximo de mensajes que puede enviar a sus réplicas.
- **Locales**: **1 MB (1048576 bytes)** (para pruebas simples).
- **Producción**: **5 MB o más** (ajustar según el tamaño de los mensajes esperados).

### 9. **Tiempo de Retención para Logs Inactivos (`segment.ms` y `segment.bytes`)**

- **Descripción**: Define el intervalo y tamaño máximo para la segmentación de logs. Los logs son divididos en segmentos para facilitar la gestión.
- **Locales**: **1 hora (3600000 ms)** y **1 GB (1073741824 bytes)** (valores moderados para desarrollo).
- **Producción**: **1 día (86400000 ms)** y **5 GB (5368709120 bytes)** (ajustar según el volumen de datos).

### 10. **Compresión de Mensajes (`compression.type`)**

- **Descripción**: Define el tipo de compresión utilizado para los mensajes del topic. Puede ser `none`, `gzip`, `snappy`, o `lz4`.
- **Locales**: **none** (suficiente para pruebas).
- **Producción**: **gzip** o **snappy** (reduce el tamaño de almacenamiento y mejora la eficiencia de red).

## Bróker

- Un broker es un nodo de apache kafka
- Se comunica con los demás brokers
- Se sincronizan mediante Apache Zookeeper

## Replicación

- Es una copia de una partición en otro broker
- Permite: 
* Tolerancia a fallos
* Evitar perdidas de datos
- Para cada partición tenemos 1 o más replicas
- Líder: Procesa peticiones
- Seguidor: Replica al líder
- ISR: Replica sincronizada.

## Productores y claves

Encargados de publicar mensajes en un broker

- Serializar
- Particionar
- Comprimir
- Repartir la carga

Eligen que mensaje asignar a que partición

1. Round-robin
2. Función Semántica

## Mensajes

Están compuesto por:

- Clave
- Valor
- Timestamp

Se recomienda no manejar mensajes muy grandes

Máximo 1mb (configurable message.max.bytes) por defecto.

## Compactación de logs

- Consiste en eliminar los registros sin clave (null)
- Nos quedaremos con el último registro para cada clave

## Bootstrap Servers

Lista de brokers para que los productores cconecten con kafka

1. Establece conexión con servidor de boostrap
2. Devuelve lista con:
    1. Brokers disponibles
    2. Topics
    3. Particiones
    4. Replicas
3. Identifica el líder de la partición
4. Envía los datos

boostrap.servers

host1:port, host2:port

Escritura en kafka

La escritura por parte del productor incluye 5 pasos:

1. Serialización
2. Particionado
3. Compresión
4. Acumulación de registros
5. Agrupación por broker y envío

## Consumidores y grupos de consumidores

- Clientes suscritos a topics que consumen mensajes
- Grupo de consumidores
- Cada mensaje solo es leido por un consumidor de cada grupo

## Modelos de mensajería

Tradicionales:

- Colas: mensajes son consumidos por un solo consumidor, desventaja, no aceptan varias consumidoras para una misma cola.
- Editor/Suscriptor: mensaje es difundido a todos los suscriptores del tópico, permite transmitir eventos de forma asíncrona sin emparejar suscriptores con consumidores.

## Grupo de consumidores

- Consumidores se asigna un grupo ()
- Cada mensaje se entrega a un consumidor dentro de cada grupo suscrito
- Todos los consumidores con el mismo grupo → cola
- Cada consumidor un grupo distinto → editor-subcriptor

## Garantía de entrega y transacciones

- **At-least-once:** siempre se entregará, en caso de fallo puede se entregue varias veces, pero no se pierde ningún sistema.
- **At-most-once:** se entregara una vez o no se entregara, un mensaje no se entregara más de una vez.
- **Exactly-once:**  garantiza que todos los mensajes se entregaran una vez, realizando el sistema las comprobaciones necesarias para que esto suceda.

## Productor idempotente

Cuando un mensaje duplicado se recibe para el mismo id de productor y mismo número de secuencia, se trata como publicado y no lo vuelve a repetir, pero manda el ACK al productor para que no lo vuelva a emitir.

## Transacciones

- Permiten escrituras atómicas a topics y particiones
- Todos los mensajes incluidos en la transacción serán escritos con éxito o ninguno lo será.
- Mensaje + offser
- Se introducen a partir de Apache 11.
- Coordinador de trasnacciones
- Log de transacciones.

Pasos transacciones

### 1. Inicializar el Productor con Transacciones

**Paso:** Configurar el productor con un `transactional.id`.

### 2. Iniciar la Transacción

**Paso:** Llamar a `initTransactions`.

### 3. Comenzar la Transacción

**Paso:** Usar `beginTransaction`.

### 4. Enviar Mensajes dentro de la Transacción

**Paso:** Enviar mensajes con `send`.

### 5. Completar o Abortar la Transacción

**Paso:**

- Completar: `commitTransaction`.
- Abortar: `abortTransaction`.

### 6. Manejo de Errores

**Paso:** Implementar lógica para manejar fallos.

### 7. Cerrar el Productor

**Paso:** Cerrar el productor con `close`.

## Schema Registry

- Componente open source desarrollado por Confluent
- Permite registrar esquemas de datos
- Repositorio centralizado
- Formato AVRO o JSON
- Asegura que los datos se insertan con un esquema concreto
- API REST
- Histórico y versiones de esquemas
- Serializadores de datos
- Interfaz de usuario

![schema-registry.png](https://github.com/a-bianchi/kafka/blob/master/images/schema-registry.png)

## Kafka Connect

- Framework para Apache Kafka
- Proporciona la capacidad de conectar Kafka con sistemas externos
- Modelos push y pull
- API para desarrollar productores y consumidores
- API principales
    - Productor
    - Consumidor
    - Kafka Streams / KSQL
    - Kafka Connect Source
    - Kafka Connect Sink

![kafka-apis.png](https://github.com/a-bianchi/kafka/blob/master/images/kafka-apis.png)

## Ventajas de Kafka Connect

- Simplifican la implementación
- Resuelven problemas como
    - Gestión de offsets
    - Recuperación de errores
    - Distribución de carga

## Kafka Streams

- API para Apache Kafka
- Permite crear aplicaciones de procesamiento en streaming
- Consume uno o más topics
- Genera salida en topics
- Puede conectarse a sistemas externos

## Stream Processing

- Procesar los datos de manera continua y secuencial
- Usa flujos de datos infinitos y sin límite de tiempo
- Batches (Lotes) → Manera tradicional
- Servicios de tiempo real
- Latencias en tiempo real y stream processing
    - 10ms - 1s
- Debemos considerar
    - Cantidad de datos a procesar de forma simultánea
    - Latencias end to end
    - Garantías de entrega
- Casos de uso
    - Monitorización de sistemas, redes o aplicaciones
    - IoT
    - Sistemas de recomendación
    - Optimización de procesos
    - Notificaciones en tiempo real
- Conceptos Clave
    - Tupla: conjunto de elementos almacenados de forma consecutiva
    - Flujos de datos: secuencia infinita de tuplas
    - Ventanas de procesamiento
        - Dividen los datos de entrada en partes finitas
        - Permiten tratar los flujos de datos con recursos limitados
        - Basadas en tiempo o número de elementos
- Operaciones sin estado:
    - Un resultado por cada elemento
- Operaciones con estado:
    - Operan sobre conjunto de elementos
- Checkpointing
    - Almacenamiento persistente del estado

## Ventajas de Kafka Streams

- No necesita un cluster dedicado (usa Kafka)
- Reprocesamiento sencillo de mensajes
- Desacoplamiento de aplicaciones, muy usado en microservicios
- Procesamiento de eventos individuales, streams nativos
- Garantías de entrega exactly-once

## Desventajas

- Acoplado con Apache Kafka
- Sin mucha adopción para cargas de trabajo pesadas

## Casos de uso

- Sistema de procesamiento escalables en tiempo real
- Infraestructura híbrida y cloud: Habilita movimiento de datos
- Plataforma central: Middleware
- Integración de sistemas y movimiento de datos
- Monitorización y alertas en tiempo real

## KSQL

- API para Kafka open source desarrollado por Confluent
- Proporciona interfaz SQL
- Operaciones de filtrado, transformación y agregación
- Abstracción sobre la API de Kafka Streams
- Bajas latencias (ms)
    - KStream: Secuencia de datos estructurados
        - Eventos son inmutables
    - KTable: Situación concreta del stream
        - Mutable
    
![joins.png](https://github.com/a-bianchi/kafka/blob/master/images/joins.png)

## Ventajas y Desventajas de KSQL

- Reduce complejidad de Kafka Streams
- Uso de SQL como lenguaje
- Para transformaciones más complejas seguir usando
    - Kafka Streams

## Arquitectura y operaciones

## Mirroring

- Copia de datos entre clusters independientes
- Es posible realizar copias parciales
    - Redundancia de datos
    - Migraciones de datos
    - Entre clusters centrales y regionales
- MirrorMaker

## Hub and Spokes

![hub-and-spokes.png](schema-registry.png](https://github.com/a-bianchi/kafka/blob/master/images/hub-and-spokes.png)

## Activo-Activo

![activo-activo.png](https://github.com/a-bianchi/kafka/blob/master/images/activo-activo.png)

## Activo-Pasivo

![activo-pasivo.png](https://github.com/a-bianchi/kafka/blob/master/images/activo-pasivo.png)