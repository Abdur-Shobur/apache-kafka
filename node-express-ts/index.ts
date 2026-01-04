import express from 'express';
import { sendMessage } from './producer';
import { startConsumer } from './consumer';

const app = express();
app.use(express.json());

// consumer চালু
startConsumer();

app.post('/user', async (req, res) => {
	const { name } = req.body;

	await sendMessage(`User created: ${name}`);

	res.json({
		success: true,
		message: 'User event sent to Kafka',
	});
});

app.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
});
