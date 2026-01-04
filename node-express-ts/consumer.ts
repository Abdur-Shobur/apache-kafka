import { kafka } from './kafka';

const consumer = kafka.consumer({ groupId: 'user-group' });

export async function startConsumer() {
	await consumer.connect();
	await consumer.subscribe({
		topic: 'user-created',
		fromBeginning: true,
	});

	await consumer.run({
		eachMessage: async ({ message }) => {
			console.log('Message received:', message.value?.toString());
		},
	});
}
