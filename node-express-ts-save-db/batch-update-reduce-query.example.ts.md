```ts
const batchSize = 100; // number of messages per batch
const batchInterval = 2000; // flush every 2 seconds if batch not full

let messageBuffer = [];

async function flushBuffer(topic) {
	if (messageBuffer.length === 0) return;

	try {
		if (topic === 'user-events') {
			const values = messageBuffer.map((data) => [data.name]);
			const placeholders = values.map(() => '(?)').join(', ');
			await db.execute(
				`INSERT INTO users (name) VALUES ${placeholders}`,
				values.flat()
			);
			console.log(`Bulk inserted ${values.length} users`);
		}

		if (topic === 'order-events') {
			const values = messageBuffer.map((data) => [data.order_id, data.amount]);
			const placeholders = values.map(() => '(?, ?)').join(', ');
			await db.execute(
				`INSERT INTO orders (order_id, amount) VALUES ${placeholders}`,
				values.flat()
			);
			console.log(`Bulk inserted ${values.length} orders`);
		}

		if (topic === 'payment-events') {
			const values = messageBuffer.map((data) => [
				data.payment_id,
				data.status,
			]);
			const placeholders = values.map(() => '(?, ?)').join(', ');
			await db.execute(
				`INSERT INTO payments (payment_id, status) VALUES ${placeholders}`,
				values.flat()
			);
			console.log(`Bulk inserted ${values.length} payments`);
		}

		messageBuffer = []; // clear buffer
	} catch (err) {
		console.error('Bulk insert error:', err);
	}
}

await consumer.run({
	eachMessage: async ({ topic, message }) => {
		if (!message.value) return;
		const data = JSON.parse(message.value.toString());

		// push to buffer
		messageBuffer.push(data);

		// flush if buffer full
		if (messageBuffer.length >= batchSize) {
			await flushBuffer(topic);
		}
	},
});

// Flush buffer periodically even if batch not full
setInterval(() => {
	flushBuffer('user-events'); // repeat for other topics as needed
	flushBuffer('order-events');
	flushBuffer('payment-events');
}, batchInterval);
```
