## Apache Kafka

Apache Kafka is a distributed event streaming platform designed to handle high-throughput, real-time data feeds. Here is a brief overview of its key features:

### 1. **Publish-Subscribe Messaging System:**

- **Produce and Consume Messages:** Producers send messages to topics, and consumers read messages from topics.

### 2. **Real-Time Stream Processing:**

- **Continuous Processing:** Processes and analyzes data in real-time as it arrives.

### 3. **Durable Storage:**

- **Persistence:** Stores messages durably, allowing consumers to read them when needed.

### 4. **Horizontal Scalability:**

- **Distribution:** Scales horizontally by distributing the workload across multiple servers (brokers).

### 5. **Fault Tolerance:**

- **Replication:** Replicates data across multiple brokers to ensure availability and fault tolerance.

### 6. **Integration:**

- **Connectors and APIs:** Provides APIs for integration with multiple systems and tools to connect to various data sources and sinks.

## Zookeeper

Zookeeper is a centralized service for maintaining configuration information, providing naming services, synchronization, and group services for distributed systems. Here is a brief overview of its key features:

### 1. **Coordination of Distributed Systems:**

- **Centralized Configuration:** Stores and manages the configuration of multiple distributed applications.
- **Synchronization:** Synchronizes data between nodes in distributed systems to ensure consistency.

### 2. **Naming Services:**

- **Registry and Discovery:** Allows services to register themselves and for other services to discover and access them.

### 3. **State Management:**

- **Tree-like Data Structure:** Uses a hierarchical model similar to a file system to store data.
- **Change Notifications:** Notifies clients about data changes, allowing for quick responses to events.

### 4. **Fault Tolerance:**

- **High Availability:** Designed to be highly available, replicating data across nodes in the cluster.

### 5. **Simplicity in Implementation:**

- **Simple API:** Provides a simple API for use, making it easy to integrate into complex systems.

## Topics

Configuration

### 1. **Number of Partitions (`num.partitions`)**

- **Description**: Defines the number of partitions for the topic. Each partition is a unit of parallelism and storage.
- **Local**: **1** (sufficient for testing, simplifies management).
- **Production**: **3 or more** (increases parallelism and fault tolerance).

### 2. **Replication Factor (`replication.factor`)**

- **Description**: Defines how many copies of each partition should exist in the cluster. Ensures data availability and durability.
- **Local**: **1** (no redundancy needed in a local development environment).
- **Production**: **3** (for high availability and fault tolerance).

### 3. **Message Retention (`retention.ms`)**

- **Description**: The time messages are retained in the topic. After this period, messages are deleted.
- **Local**: **7 days (604800000 ms)** (sufficient for testing).
- **Production**: **7 days or more**, depending on storage and compliance requirements.

### 4. **Maximum Message Size (`max.message.bytes`)**

- **Description**: The maximum size of a message in bytes. Determines the upper limit for the size of messages that can be sent to the topic.
- **Local**: **1 MB (1048576 bytes)** (sufficient for basic testing).
- **Production**: **10 MB or more** (adjust based on specific data needs).

### 5. **Log Cleanup Policy (`cleanup.policy`)**

- **Description**: Defines how topic logs should be cleaned up. Can be time-based (`delete`) or size-based (`compact`).
- **Local**: **delete** (time-based deletion, useful for testing).
- **Production**: **delete** or **compact** (compaction for key-value data, deletion for event logs).

### 6. **Minimize Acknowledgement (`acks`)**

- **Description**: Defines the number of replicas that must acknowledge the reception of a message before the producer considers it successfully sent.
- **Local**: **1** (sufficient for testing, lower latency).
- **Production**: **all** (ensures message replication across all replicas, higher durability).

### 7. **Request Timeout (`request.timeout.ms`)**

- **Description**: The maximum time the producer will wait to receive an acknowledgment from the broker.
- **Local**: **30 seconds (30000 ms)** (adjusted for a development environment).
- **Production**: **60 seconds (60000 ms) or more** (adjust based on fault tolerance).

### 8. **Message Buffer (`message.max.bytes` and `replica.fetch.max.bytes`)**

- **Description**: Maximum message size a broker can receive and the maximum size of messages it can send to its replicas.
- **Local**: **1 MB (1048576 bytes)** (for simple testing).
- **Production**: **5 MB or more** (adjust based on expected message size).

### 9. **Log Segment Retention (`segment.ms` and `segment.bytes`)**

- **Description**: Defines the interval and maximum size for log segmentation. Logs are split into segments for easier management.
- **Local**: **1 hour (3600000 ms)** and **1 GB (1073741824 bytes)** (moderate values for development).
- **Production**: **1 day (86400000 ms)** and **5 GB (5368709120 bytes)** (adjust based on data volume).

### 10. **Message Compression (`compression.type`)**

- **Description**: Defines the type of compression used for topic messages. Can be `none`, `gzip`, `snappy`, or `lz4`.
- **Local**: **none** (sufficient for testing).
- **Production**: **gzip** or **snappy** (reduces storage size and improves network efficiency).

## Broker

- A broker is a node in Apache Kafka.
- Communicates with other brokers.
- Synchronized via Apache Zookeeper.

## Replication

- A copy of a partition on another broker.
- Enables:
  * Fault tolerance
  * Data loss prevention
- Each partition has 1 or more replicas.
- Leader: Processes requests.
- Follower: Replicates the leader.
- ISR: In-Sync Replica.

## Producers and Keys

Producers publish messages to a broker.

- Serialize
- Partition
- Compress
- Distribute load

Choose which message to assign to which partition.

1. Round-robin
2. Semantic function

## Messages

Composed of:

- Key
- Value
- Timestamp

It is recommended not to handle very large messages.

Maximum 1MB (configurable via `message.max.bytes`) by default.

## Log Compaction

- Removes records without a key (null).
- Keeps the last record for each key.

## Bootstrap Servers

List of brokers for producers to connect with Kafka.

1. Establishes connection with bootstrap server.
2. Returns a list with:
    1. Available brokers
    2. Topics
    3. Partitions
    4. Replicas
3. Identifies the partition leader.
4. Sends data.

`bootstrap.servers`

`host1:port, host2:port`

Writing to Kafka

Writing by the producer involves 5 steps:

1. Serialization
2. Partitioning
3. Compression
4. Record accumulation
5. Grouping by broker and sending

## Consumers and Consumer Groups

- Clients subscribed to topics that consume messages.
- Consumer group
- Each message is read by only one consumer in each group.

## Messaging Models

Traditional:

- Queues: messages are consumed by a single consumer, disadvantage, they do not support multiple consumers for the same queue.
- Publisher/Subscriber: message is broadcast to all topic subscribers, allows asynchronous event transmission without pairing subscribers with consumers.

## Consumer Group

- Consumers are assigned a group.
- Each message is delivered to one consumer within each subscribed group.
- All consumers in the same group → queue.
- Each consumer a different group → publisher-subscriber.

## Delivery Guarantees and Transactions

- **At-least-once:** always delivered, in case of failure it may be delivered multiple times, but no message is lost.
- **At-most-once:** will be delivered once or not delivered at all, a message will not be delivered more than once.
- **Exactly-once:** guarantees that all messages will be delivered once, with the system performing the necessary checks to ensure this.

## Idempotent Producer

When a duplicate message is received for the same producer ID and sequence number, it is treated as published and not repeated, but the ACK is sent to the producer to prevent re-emission.

## Transactions

- Allow atomic writes to topics and partitions.
- All messages included in the transaction will be successfully written or none will be.
- Message + offset
- Introduced from Apache 11.
- Transaction coordinator.
- Transaction log.

### Transaction Steps

### 1. Initialize the Producer with Transactions

**Step:** Configure the producer with a `transactional.id`.

### 2. Start the Transaction

**Step:** Call `initTransactions`.

### 3. Begin the Transaction

**Step:** Use `beginTransaction`.

### 4. Send Messages within the Transaction

**Step:** Send messages with `send`.

### 5. Complete or Abort the Transaction

**Step:**

- Complete: `commitTransaction`.
- Abort: `abortTransaction`.

### 6. Error Handling

**Step:** Implement logic to handle failures.

### 7. Close the Producer

**Step:** Close the producer with `close`.

## Schema Registry

- Open-source component developed by Confluent
- Allows registering data schemas
- Centralized repository
- AVRO or JSON format
- Ensures data is inserted with a specific schema
- REST API
- Schema history and versions
- Data serializers
- User interface

![schema-registry.png](https://github.com/a-bianchi/kafka/blob/master/images/schema-registry.png)

## Kafka Connect

- Framework for Apache Kafka
- Provides the ability to connect Kafka with external systems
- Push and pull models
- API for developing producers and consumers
- Main APIs:
    - Producer
    - Consumer
    - Kafka Streams / KSQL
    - Kafka Connect Source
    - Kafka Connect Sink

![kafka-apis.png](https://github.com/a-bianchi/kafka/blob/master/images/kafka-apis.png)

## Advantages of Kafka Connect

- Simplify implementation
- Solve problems such as:
    - Offset management
    - Error recovery
    - Load distribution

## Kafka Streams

- API for Apache Kafka
- Allows creating streaming processing applications
- Consumes one or more topics
- Generates output in topics
- Can connect to external systems

## Stream Processing

- Continuously and sequentially process data
- Uses infinite data flows with no time limit
- Batches (Traditional way)
- Real-time services
- Real-time latencies and stream processing:
    - 10ms - 1s
- Considerations:
    - Amount of data to be processed simultaneously
    - End-to-end latencies
    - Delivery guarantees
- Use cases:
    - Monitoring systems, networks, or applications
    - IoT
    - Recommendation systems
    - Process optimization
    - Real-time notifications
- Key Concepts:
    - Tuple: a set of consecutively stored elements
    - Data streams: an infinite sequence of tuples
    - Processing windows:
        - Divide input data into finite parts
        - Allow treating data streams with limited resources
        - Based on time or number of elements
- Stateless operations:
    - One result per element
- Stateful operations:
    - Operate on a set of elements
- Checkpointing:
    - Persistent state storage

## Advantages of Kafka Streams

- Does not require a dedicated cluster (uses Kafka)
- Easy message reprocessing
- Application decoupling, widely used in microservices
- Processing individual events, native streams
- Exactly-once delivery guarantees

## Disadvantages

- Tied to Apache Kafka
- Not widely adopted for heavy workloads

## Use Cases

- Scalable real-time processing systems
- Hybrid and cloud infrastructure: Enables data movement
- Central platform: Middleware
- System integration and data movement
- Real-time monitoring and alerts

## KSQL

- Open-source API for Kafka developed by Confluent
- Provides a SQL interface
- Filtering, transformation, and aggregation operations
- Abstraction over the Kafka Streams API
- Low latencies (ms)
    - KStream: Sequence of structured data
        - Events are immutable
    - KTable: Concrete situation of the stream
        - Mutable
    
![joins.png](https://github.com/a-bianchi/kafka/blob/master/images/joins.png)

## Advantages and Disadvantages of KSQL

- Reduces complexity of Kafka Streams
- Uses SQL as a language
- For more complex transformations, continue using:
    - Kafka Streams

## Architecture and Operations

## Mirroring

- Data copying between independent clusters
- Partial copies are possible
    - Data redundancy
    - Data migrations
    - Between central and regional clusters
- MirrorMaker

## Hub and Spokes

![hub-and-spokes.png](https://github.com/a-bianchi/kafka/blob/master/images/hub-and-spokes.png)

## Active-Active

![activo-activo.png](https://github.com/a-bianchi/kafka/blob/master/images/activo-activo.png)

## Active-Passive

![activo-pasivo.png](https://github.com/a-bianchi/kafka/blob/master/images/activo-pasivo.png)
