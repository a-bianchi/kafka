import 'dotenv/config';

export default () => ({
  kafka: {
    name: process.env.KAFKA_NAME,
    clientId: process.env.KAFKA_CLIENT_ID,
    topic: process.env.KAFKA_TOPIC,
    groupId: process.env.KAFKA_GROUP_ID,
    brokers: [
      process.env.KAFKA_BROKER_1,
      process.env.KAFKA_BROKER_2,
      process.env.KAFKA_BROKER_3,
    ],
  },
});
