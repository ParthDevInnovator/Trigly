import { GoogleGenerativeAI } from '@google/generative-ai'

export const generateSmartReply = async (
    prompt: string,
    history: { role: 'assistant' | 'user'; content: string }[]
): Promise<string> => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

    // Gemini expects history in { role: "user" | "model", parts: [{ text }] } format
    const formattedHistory = history.map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }],
    }))

    const model = genAI.getGenerativeModel({
        model: 'gemini-flash-latest',
        systemInstruction: `${prompt}: Keep responses under 2 sentences`,
    })

    let latestMessage = "Respond contextually according to instructions."

    if (formattedHistory.length > 0 && formattedHistory[formattedHistory.length - 1].role === 'user') {
        latestMessage = formattedHistory.pop()?.parts[0].text || latestMessage
    }

    const chat = model.startChat({
        history: formattedHistory,
    })

    const result = await chat.sendMessage(latestMessage)
    return result.response.text()
}
