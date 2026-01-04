import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
	clientId: 'KsbhDVdeQYGKwWo8hEibdA',
	brokers: ['localhost:9092'],
});
