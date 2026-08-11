import { getOpenAi } from '../openai'

export const generateSmartReply = async (
    prompt: string,
    history: { role: 'assistant' | 'user'; content: string }[]
): Promise<string> => {
    const rawOpenAiClient = getOpenAi()
    const result = await rawOpenAiClient.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'assistant',
                content: `${prompt}: Keep responses under 2 sentences`,
            },
            ...history,
        ],
    })

    return result.choices[0].message.content || ''
}
