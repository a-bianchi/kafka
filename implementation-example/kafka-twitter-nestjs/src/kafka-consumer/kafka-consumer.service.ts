import appConfig from '@/config/app.config';
import { Twitter } from '@/types/twitter.type';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';

const kafkaConfig = appConfig().kafka;

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: kafkaConfig.clientId,
    brokers: kafkaConfig.brokers,
  });
  private consumer: Consumer;

  async onModuleInit() {
    this.consumer = this.kafka.consumer({ groupId: kafkaConfig.groupId });
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: kafkaConfig.topic,
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const messageValue = message.value.toString();
        // console.log({
        //   partition,
        //   offset: message.offset,
        //   value: messageValue,
        // });

        // Process message to extract hashtags
        this.detHashtags(messageValue);
      },
    });
  }

  private detHashtags(message: string) {
    try {
      const tweet = JSON.parse(message) as Twitter;
      const hashtags = this.extractHashtags(tweet.text);
      if (hashtags.length === 0) {
        console.log('No hashtags found in message id:', tweet.id);
        return;
      }
      console.log(`Extracted hashtags: ${hashtags.join(', ')}`);
    } catch (error) {
      console.error('Error processing message:', message, error);
    }
  }

  private extractHashtags(text: string): string[] {
    const hashtagRegex = /#(\w+)/g;
    const hashtags = [];
    let match;

    while ((match = hashtagRegex.exec(text)) !== null) {
      hashtags.push(match[1]);
    }

    return hashtags;
  }
}
