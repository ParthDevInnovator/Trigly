"use server"

import { client } from '@/lib/prisma'

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
        isBot: idx % 2 !== 0
    }))
}

// Ensure the db records map correctly. In `createChatHistory`:
// receiver mapping:
// When bot sends: sender = bot_id (automation.id), reciever = customer_id. So reciever is NOT null.
// When customer sends: sender = customer_id, reciever = bot_id. Oh wait, `createChatHistory` arguments are: `automationId, sender, reciever, message`.
