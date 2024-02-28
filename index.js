import express from 'express';
import OpenAI from "openai";
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/synonym/', async (req, res) => {
    const sourceText = req.body.sourceText;
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": "You are a linguist. "
            },
            {
                "role": "user",
                "content": "Give me 3 synonyms for this word, listed in one sentence, seperated by commas: " + sourceText
            }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    const synonymsText = response.choices[0].message.content

    res.status(200).json({ synonymsText: synonymsText });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});