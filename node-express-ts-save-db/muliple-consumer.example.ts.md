```ts
// Define topic handlers dynamically
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
	// Add new topics easily here
};

export async function startConsumer() {
	await consumer.connect();

	// Subscribe to all topics defined in the handler map
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

			try {
				await handler(data, db);
			} catch (err) {
				console.error(`Error processing ${topic}:`, err);
				throw err;
			}
		},
	});

	console.log('Kafka consumer running for multiple topics dynamically...');
}
```
