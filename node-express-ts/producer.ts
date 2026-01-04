import { kafka } from './kafka';

const producer = kafka.producer();

export async function sendMessage(message: string) {
	await producer.connect();

	await producer.send({
		topic: 'user-created',
		messages: [{ value: message }],
	});

	console.log('Message sent:', message);
}
