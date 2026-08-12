"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Bot, User, MessageCircle } from 'lucide-react'
import { getSimulatedChat, sendSimulatedMessage } from '@/actions/simulator'
import { useMutation, useQuery } from '@tanstack/react-query'

export const InstagramSimulator = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [keyword, setKeyword] = useState('')
    const scrollRef = useRef<HTMLDivElement>(null)
    const SENDER_ID = 'simulated_customer_123'

    // Fetch local mock chat history
    const { data: chatHistory, refetch, isFetching } = useQuery({
        queryKey: ['simulated_chat'],
        queryFn: () => getSimulatedChat(SENDER_ID),
        refetchInterval: isOpen ? 3000 : false,
    })

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [chatHistory])

    // Mutation to send message via server action
    const { mutate: fireWebhook, isPending } = useMutation({
        mutationFn: async (text: string) => {
            return sendSimulatedMessage(text)
        },
        onSuccess: () => {
            setKeyword('')
            refetch()
        }
    })


    // Start chat with simulated webhook
    const handleSend = () => {
        if (!keyword.trim()) return
        fireWebhook(keyword)
    }

    // Floating button style
    if (!isOpen) {
        return (
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-transform"
            >
                <MessageCircle className="w-6 h-6 text-white" />
            </Button>
        )
    }

    return (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-background border shadow-2xl rounded-2xl flex flex-col overflow-hidden z-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center z-10 shadow-md">
                <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    <h3 className="font-semibold text-sm">Demo Simulator</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:text-white/80 shrink-0 h-6">
                    Close
                </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-muted/20 p-4 overflow-y-auto flex flex-col gap-3" ref={scrollRef}>
                <div className="text-center text-xs text-muted-foreground mb-2">Simulated Instagram DM Window</div>

                {chatHistory?.length === 0 && (
                    <div className="text-center text-sm text-muted-foreground mt-10">
                        Send a keyword to test your automation.
                    </div>
                )}

                {chatHistory?.map((chat: any) => (
                    <div key={chat.id} className={`flex max-w-[85%] ${chat.isBot ? 'self-start' : 'self-end'}`}>
                        <div className={`p-3 rounded-2xl text-sm ${chat.isBot
                            ? 'bg-white border text-foreground rounded-tl-none shadow-sm'
                            : 'bg-blue-600 text-white rounded-tr-none shadow-sm'
                            }`}>
                            {chat.message}
                        </div>
                    </div>
                ))}
                {isPending && (
                    <div className="self-end bg-blue-600/50 text-white p-3 rounded-2xl rounded-tr-none text-sm animate-pulse">
                        ...
                    </div>
                )}
                {(isFetching && !isPending) && (
                    <div className="self-start text-xs text-muted-foreground animate-pulse ml-2">Bot is typing...</div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-background border-t">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                    <Input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Type a keyword..."
                        disabled={isPending}
                        className="flex-1 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-blue-500"
                    />
                    <Button type="submit" disabled={isPending || !keyword.trim()} className="bg-blue-600 hover:bg-blue-700 shrink-0 h-10 w-10 p-0 rounded-full">
                        {isPending ? <Bot className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
                    </Button>
                </form>
            </div>
        </div>
    )
}
