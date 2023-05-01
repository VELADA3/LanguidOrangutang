import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'image-alpha-001',
        prompt,
        n: 1,
        size: '256x256',
      }),
    });

    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'Something went wrong');
  }
});

app.listen(5000, () => console.log('Server started on http://localhost:5000'));
