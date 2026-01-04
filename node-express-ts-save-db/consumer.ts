// consumer.ts
import { kafka } from './kafka';
import { db } from './db';

const consumer = kafka.consumer({
	groupId: 'user-db-group',
});

export async function startConsumer() {
	await consumer.connect();
	await consumer.subscribe({
		topic: 'user-events',
		fromBeginning: true,
	});

	await consumer.run({
		eachMessage: async ({ message }) => {
			if (!message.value) return;

			const data = JSON.parse(message.value.toString());
			const { name } = data;

			try {
				await db.execute('INSERT INTO users (name) VALUES (?)', [name]);
				console.log('Saved to DB:', name);
			} catch (err) {
				console.error('DB Error:', err);
				throw err;
			}
		},
	});

	console.log('Kafka consumer running...');
}
