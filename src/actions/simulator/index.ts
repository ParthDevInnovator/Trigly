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

        // ── Step 1: Check if the message matches any keyword trigger ──
        const lowerText = text.toLowerCase()

        const allAutomations = await client.automation.findMany({
            where: { active: true },
            include: {
                keywords: true,
                listener: true,
                posts: true,
            },
        })

        let replyText: string | null = null
        let matchedAutomation: typeof allAutomations[0] | null = null

        for (const automation of allAutomations) {
            const matchedKeyword = automation.keywords.find((kw) =>
                lowerText.includes(kw.word.toLowerCase())
            )
            if (matchedKeyword) {
                matchedAutomation = automation

                // Determine reply text from keyword OR listener
                if (matchedKeyword.reply) {
                    replyText = matchedKeyword.reply
                } else if (automation.listener?.listener === 'MESSAGE' && automation.listener.prompt) {
                    replyText = automation.listener.prompt
                }

                // If it's SMARTAI, we will handle it below by setting replyText to null for now
                // but we know we matched an automation!
                if (automation.listener?.listener === 'SMARTAI') {
                    replyText = null
                }

                console.log(`[Simulator] ✅ Keyword "${matchedKeyword.word}" matched`)
                break
            }
        }

        // ── Step 2: If no static reply was found, fall back to AI ──
        if (!replyText) {
            try {
                // If we matched an automation that uses SMARTAI, use its prompt as context!
                const systemPrompt = (matchedAutomation?.listener?.listener === 'SMARTAI' && matchedAutomation.listener.prompt)
                    ? `${SIMULATOR_PROMPT}\nAdmin instructions: ${matchedAutomation.listener.prompt}`
                    : SIMULATOR_PROMPT

                replyText = await generateSmartReply(
                    systemPrompt,
                    [{ role: 'user', content: text }]
                )
                console.log('[Simulator] 🤖 AI Reply:', replyText)
            } catch (aiError) {
                console.error('[Simulator] AI error, using fallback:', aiError)
                replyText = matchedAutomation?.listener?.prompt || "Thanks for your message! Our team will get back to you shortly."
            }
        }

        // Append attached post info if it exists (for simulation visual feedback)
        if (matchedAutomation?.posts && matchedAutomation.posts.length > 0) {
            replyText += `\n\n[Attached Post Media: ${matchedAutomation.posts[0].media}]`
        }

        // ── Step 3: Save bot reply to DB ──
        await client.dms.create({
            data: {
                automationId: matchedAutomation?.id,
                senderId: BOT_ID,
                reciever: SENDER_ID,
                message: replyText,
            }
        })

        // ── Step 4: Increment analytics if keyword matched ──
        if (matchedAutomation?.listener) {
            await client.listener.update({
                where: { id: matchedAutomation.listener.id },
                data: { dmCount: { increment: 1 } },
            })
        }

        return { success: true }
    } catch (error) {
        console.error('[Simulator] Error:', error)

        const fallbackReply = "Thanks for your message! Our team will get back to you shortly."
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
