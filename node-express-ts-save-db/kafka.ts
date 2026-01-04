import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
	clientId: 'd4dFGcViTkOccF2R_cuDWw',
	brokers: ['localhost:9092'],
});

export let producer: ReturnType<Kafka['producer']>;
let producerReady = false;

export async function initProducer() {
	if (!producer) {
		producer = kafka.producer();
		await producer.connect();
		producerReady = true;
		console.log('Kafka Producer connected');
	}
	return producerReady;
}
