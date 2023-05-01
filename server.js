import express from 'express'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Image Generator!'
  })
})

app.post('/', async (req, res) => {
  try {
    const { prompt, resolution, format, style } = req.body;
    const promptWithStyle = `Create a ${resolution}x${resolution} seamless, tiling texture image in the theme/style of "${style}". ${prompt}`;

    // Code to generate image using OpenAI API with the updated promptWithStyle

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('Image Generator server started on http://localhost:5000'))
