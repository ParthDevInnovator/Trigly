"use server"

import { client } from '@/lib/prisma'
import { generateSmartReply } from '@/lib/ai/provider'

const SENDER_ID = 'simulated_customer_123'
const BOT_ID = 'simulated_bot_999'

const SIMULATOR_PROMPT = `You are Trigly, an AI-powered Instagram automation assistant. 
You help businesses automate their Instagram DM responses. 
Reply in a friendly, helpful, and concise manner. Keep responses under 2 sentences.`

export async function getSimulatedChat(senderId: string) {
    const history = await client.dms.findMany({
        where: {
            OR: [
                { senderId: senderId },
                { reciever: senderId }
            ]
        },
        orderBy: { createdAt: 'asc' },
    })

    return history.map((chat: any, idx: number) => ({
        id: chat.id,
        message: chat.message,
        isBot: chat.senderId === BOT_ID
    }))
}

export async function sendSimulatedMessage(text: string) {
    try {
        // Save user message to DB
        await client.dms.create({
            data: {
                senderId: SENDER_ID,
                reciever: BOT_ID,
                message: text,
            }
        })

        // Generate AI reply via Gemini
        const aiReply = await generateSmartReply(
            SIMULATOR_PROMPT,
            [{ role: 'user', content: text }]
        )

        console.log('[Simulator] AI Reply:', aiReply)

        // Save bot reply to DB
        await client.dms.create({
            data: {
                senderId: BOT_ID,
                reciever: SENDER_ID,
                message: aiReply,
            }
        })

        return { success: true }
    } catch (error) {
        console.error('[Simulator] Error:', error)

        // Fallback so the demo always works even if API key is invalid/expired
        const fallbackReply = "This is a simulated AI fallback reply. Please check your Gemini API key in the .env file."
        await client.dms.create({
            data: {
                senderId: BOT_ID,
                reciever: SENDER_ID,
                message: fallbackReply,
            }
        })

        return { success: true, error: String(error) }
    }
}
