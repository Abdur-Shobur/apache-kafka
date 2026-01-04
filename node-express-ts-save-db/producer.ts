// producer.ts
import { producer, initProducer } from './kafka';

export async function sendUserEvent(name: string) {
	try {
		await initProducer();

		await producer.send({
			topic: 'user-events',
			messages: [{ value: JSON.stringify({ name }) }],
		});

		console.log(`Event sent for user: ${name}`);
	} catch (error) {
		console.error(`Failed to send user event for ${name}:`, error);
	}
}
