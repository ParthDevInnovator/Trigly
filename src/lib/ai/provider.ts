import { getAiProvider } from '../config'
import * as openaiAPI from './openai'
import * as geminiAPI from './gemini'

export const generateSmartReply = async (
    prompt: string,
    history: { role: 'assistant' | 'user'; content: string }[]
): Promise<string> => {
    const provider = getAiProvider()

    if (provider === 'gemini') {
        return geminiAPI.generateSmartReply(prompt, history)
    }

    return openaiAPI.generateSmartReply(prompt, history)
}
