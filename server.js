import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import openai from 'openai';
import dotenv from 'dotenv';

dotenv.config();
openai.apiKey = process.env.OPENAI_API_KEY;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
  try {
    const { prompt, resolution, format, theme } = req.body;
    const promptWithRequirements = `${prompt}\nTheme: ${theme}\nSeamless tiling texture\nResolution: ${resolution}x${resolution}\nFormat: ${format}`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${promptWithRequirements}`,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    const imageURL = response.choices[0].text.trim();
    res.send({ imageURL });
  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
