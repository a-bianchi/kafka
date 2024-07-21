import { Module } from '@nestjs/common';
import appConfig from './config/app.config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaProducerService } from './kafka-producer/kafka-producer.service';
import { KafkaConsumerService } from './kafka-consumer/kafka-consumer.service';

const kafkaConfig = appConfig().kafka;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: kafkaConfig.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: kafkaConfig.clientId,
            brokers: kafkaConfig.brokers,
          },
          consumer: {
            groupId: kafkaConfig.groupId,
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [KafkaProducerService, KafkaConsumerService],
})
export class AppModule {}
