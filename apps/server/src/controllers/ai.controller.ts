import { systemPrompt } from '@/utils/ai';
import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handleAIChat = async (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message) {
    res.status(400).json({ error: 'Missing message' });
    return;
  }

  try {
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: [
        { role: 'system', content: systemPrompt.trim() },
        { role: 'user', content: message },
      ],
    });

    const reply = chatResponse.choices[0]?.message?.content;
    res.status(200).json({ reply });
    return;
  } catch (error) {
    console.error('AI error', error);
    res.status(500).json({ error: 'Failed to generate reply' });
    return;
  }
};
