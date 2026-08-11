import OpenAi from 'openai'

export const getOpenAi = () => new OpenAi({
  apiKey: process.env.OPEN_AI_KEY,
})