```ts
import PQueue from 'p-queue'; // npm install p-queue

// Define a queue with concurrency = 1 or 2 (slow down DB writes)
const dbQueue = new PQueue({ concurrency: 2, interval: 1000, intervalCap: 5 });
// - concurrency: how many tasks at the same time
// - interval & intervalCap: throttle how many tasks per interval (ms)

const topicHandlers = {
	'user-events': async (data, db) => {
		await db.execute('INSERT INTO users (name) VALUES (?)', [data.name]);
		console.log('User saved:', data.name);
	},
	'order-events': async (data, db) => {
		await db.execute('INSERT INTO orders (order_id, amount) VALUES (?, ?)', [
			data.order_id,
			data.amount,
		]);
		console.log('Order saved:', data.order_id);
	},
	'payment-events': async (data, db) => {
		await db.execute(
			'INSERT INTO payments (payment_id, status) VALUES (?, ?)',
			[data.payment_id, data.status]
		);
		console.log('Payment saved:', data.payment_id);
	},
};

export async function startConsumer() {
	await consumer.connect();

	await consumer.subscribe({
		topics: Object.keys(topicHandlers),
		fromBeginning: true,
	});

	await consumer.run({
		eachMessage: async ({ topic, message }) => {
			if (!message.value) return;

			const data = JSON.parse(message.value.toString());
			const handler = topicHandlers[topic];

			if (!handler) {
				console.warn('No handler for topic:', topic);
				return;
			}

			// Add DB write to the queue (async)
			dbQueue
				.add(() => handler(data, db))
				.catch((err) => {
					console.error(`Error writing ${topic} to DB:`, err);
				});
		},
	});

	console.log('Kafka consumer running with throttled DB writes...');
}
```
