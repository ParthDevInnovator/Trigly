import { findAutomation } from '@/actions/automations/queries'
import {
    createChatHistory,
    getChatHistory,
    getKeywordAutomation,
    getKeywordPost,
    matchKeyword,
    trackResponses,
} from '@/actions/webhook/queries'
import { sendDirectMessage, sendCommentReply } from '@/lib/instagram/provider'
import { openai } from '@/lib/openai'
import { client } from '@/lib/prisma'
import { InstagramWebhookPayload } from '@/types/instagram'

export async function handleIncomingEvent(
    webhook_payload: InstagramWebhookPayload
): Promise<{ status: number; message: string }> {
    let matcher
    try {
        if (webhook_payload.entry[0].messaging) {
            matcher = await matchKeyword(
                webhook_payload.entry[0].messaging[0].message.text
            )
        }

        if (webhook_payload.entry[0].changes) {
            matcher = await matchKeyword(
                webhook_payload.entry[0].changes[0].value.text
            )
        }

        if (matcher && matcher.automationId) {
            console.log('Matched')
            // We have a keyword matcher

            if (webhook_payload.entry[0].messaging) {
                const automation = await getKeywordAutomation(
                    matcher.automationId,
                    true
                )

                if (automation && automation.trigger) {
                    if (
                        automation.listener &&
                        automation.listener.listener === 'MESSAGE'
                    ) {
                        const direct_message = await sendDirectMessage(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            automation.listener?.prompt,
                            automation.User?.integrations[0].token!
                        )

                        if (direct_message.status === 200) {
                            const tracked = await trackResponses(automation.id, 'DM')
                            if (tracked) {
                                return { status: 200, message: 'Message sent' }
                            }
                        }
                    }

                    if (
                        automation.listener &&
                        automation.listener.listener === 'SMARTAI' &&
                        automation.User?.subscription?.plan === 'PRO'
                    ) {
                        const smart_ai_message = await openai.chat.completions.create({
                            model: 'gpt-4o',
                            messages: [
                                {
                                    role: 'assistant',
                                    content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
                                },
                            ],
                        })

                        if (smart_ai_message.choices[0].message.content) {
                            const reciever = createChatHistory(
                                automation.id,
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                webhook_payload.entry[0].messaging[0].message.text
                            )

                            const sender = createChatHistory(
                                automation.id,
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                smart_ai_message.choices[0].message.content
                            )

                            await client.$transaction([reciever, sender])

                            const direct_message = await sendDirectMessage(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                smart_ai_message.choices[0].message.content,
                                automation.User?.integrations[0].token!
                            )

                            if (direct_message.status === 200) {
                                const tracked = await trackResponses(automation.id, 'DM')
                                if (tracked) {
                                    return { status: 200, message: 'Message sent' }
                                }
                            }
                        }
                    }
                }
            }

            if (
                webhook_payload.entry[0].changes &&
                webhook_payload.entry[0].changes[0].field === 'comments'
            ) {
                const automation = await getKeywordAutomation(
                    matcher.automationId,
                    false
                )

                console.log('geting the automations')

                const automations_post = await getKeywordPost(
                    webhook_payload.entry[0].changes[0].value.media.id,
                    automation?.id!
                )

                console.log('found keyword ', automations_post)

                if (automation && automations_post && automation.trigger) {
                    console.log('first if')
                    if (automation.listener) {
                        console.log('first if')
                        if (automation.listener.listener === 'MESSAGE') {
                            console.log(
                                'SENDING DM, WEB HOOK PAYLOAD',
                                webhook_payload,
                                'changes',
                                webhook_payload.entry[0].changes[0].value.from
                            )

                            console.log(
                                'COMMENT VERSION:',
                                webhook_payload.entry[0].changes[0].value.from.id
                            )

                            const direct_message = await sendCommentReply(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].changes[0].value.id,
                                automation.listener?.prompt,
                                automation.User?.integrations[0].token!
                            )

                            console.log('DM SENT', direct_message.data)
                            if (direct_message.status === 200) {
                                const tracked = await trackResponses(automation.id, 'COMMENT')

                                if (tracked) {
                                    return { status: 200, message: 'Message sent' }
                                }
                            }
                        }
                        if (
                            automation.listener.listener === 'SMARTAI' &&
                            automation.User?.subscription?.plan === 'PRO'
                        ) {
                            const smart_ai_message = await openai.chat.completions.create({
                                model: 'gpt-4o',
                                messages: [
                                    {
                                        role: 'assistant',
                                        content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
                                    },
                                ],
                            })
                            if (smart_ai_message.choices[0].message.content) {
                                const reciever = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    webhook_payload.entry[0].changes[0].value.text
                                )

                                const sender = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    smart_ai_message.choices[0].message.content
                                )

                                await client.$transaction([reciever, sender])

                                const direct_message = await sendCommentReply(
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.id,
                                    automation.listener?.prompt,
                                    automation.User?.integrations[0].token!
                                )

                                if (direct_message.status === 200) {
                                    const tracked = await trackResponses(automation.id, 'COMMENT')

                                    if (tracked) {
                                        return { status: 200, message: 'Message sent' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (!matcher) {
            const customer_history = await getChatHistory(
                webhook_payload.entry[0].messaging![0].recipient.id,
                webhook_payload.entry[0].messaging![0].sender.id
            )

            if (customer_history.history.length > 0) {
                const automation = await findAutomation(customer_history.automationId!)

                if (
                    automation?.User?.subscription?.plan === 'PRO' &&
                    automation.listener?.listener === 'SMARTAI'
                ) {
                    const smart_ai_message = await openai.chat.completions.create({
                        model: 'gpt-4o',
                        messages: [
                            {
                                role: 'assistant',
                                content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
                            },
                            ...customer_history.history,
                            {
                                role: 'user',
                                content: webhook_payload.entry[0].messaging![0].message.text,
                            },
                        ],
                    })

                    if (smart_ai_message.choices[0].message.content) {
                        const reciever = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging![0].sender.id,
                            webhook_payload.entry[0].messaging![0].message.text
                        )

                        const sender = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging![0].sender.id,
                            smart_ai_message.choices[0].message.content
                        )
                        await client.$transaction([reciever, sender])
                        const direct_message = await sendDirectMessage(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging![0].sender.id,
                            smart_ai_message.choices[0].message.content,
                            automation.User?.integrations[0].token!
                        )

                        if (direct_message.status === 200) {
                            //if successfully send we return
                            return { status: 200, message: 'Message sent' }
                        }
                    }
                }
            }

            return { status: 200, message: 'No automation set' }
        }
        return { status: 200, message: 'No automation set' }
    } catch (error) {
        return { status: 200, message: 'No automation set' }
    }
}
