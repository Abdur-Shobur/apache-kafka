// server.ts
import express from 'express';
import { sendUserEvent } from './producer';
import { startConsumer } from './consumer';
import { db } from './db';

const app = express();
app.use(express.json());

// Start Kafka consumer
startConsumer().catch(console.error);

// Test endpoint to send event
app.post('/user', async (req, res) => {
	const { name } = req.body;
	if (!name) return res.status(400).json({ message: 'Name is required' });

	await sendUserEvent(name);
	res.json({ message: 'Event sent to Kafka' });
});

// Fetch users from MySQL
app.get('/users', async (req, res) => {
	const [rows] = await db.execute('SELECT * FROM users');
	res.json(rows);
});

app.listen(3000, () => {
	console.log('API running on http://localhost:3000');
});
