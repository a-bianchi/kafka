import appConfig from '@/config/app.config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, logLevel, Partitioners } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as readline from 'readline';
import { Twitter } from '@/types/twitter.type';

const kafkaConfig = appConfig().kafka;

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: kafkaConfig.clientId, // The client ID for the Kafka producer
    brokers: kafkaConfig.brokers, // List of Kafka broker addresses
    logLevel: logLevel.INFO, // Logging level
  });
  private producer: Producer;
  private transactionalId = `my-transactional-id-${uuidv4()}`; // Unique transactional ID

  async onModuleInit() {
    this.producer = this.kafka.producer({
      idempotent: true, // Ensures exactly-once delivery semantics
      maxInFlightRequests: 1, // Limits the number of in-flight requests
      allowAutoTopicCreation: true, // Allows automatic creation of topics
      transactionalId: this.transactionalId, // Transactional ID for the producer
      retry: {
        initialRetryTime: 300, // Initial retry time in milliseconds
      },
      createPartitioner: Partitioners.LegacyPartitioner,
    });

    await this.producer.connect(); // Connects the producer to the Kafka broker

    // Call processFile after the producer has been connected
    await this.processFile('src/tweets.txt', kafkaConfig.topic);
  }

  async produceMessage(topic: string, message: Twitter) {
    if (message.entities?.hashtags && message.entities.hashtags.length > 0) {
      await this.producer.send({
        topic, // Topic to send the message to
        messages: [{ value: JSON.stringify(message) }], // Message to send
      });
    }
  }

  async processFile(filePath: string, topic: string) {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      try {
        const message = JSON.parse(line) as Twitter;
        await this.produceMessage(topic, message);
      } catch (error) {
        console.error('Error processing line:', line, error);
      }
    }

    console.log('Finished processing file');
  }
}
