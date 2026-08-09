export const sendDirectMessage = async (
    userId: string,
    receiverId: string,
    prompt: string,
    token: string
): Promise<{ status: number; data?: any }> => {
    console.log('[Mocked] sendDirectMessage:', { userId, receiverId, prompt })
    return { status: 200, data: { simulated: true } }
}

export const sendCommentReply = async (
    userId: string,
    receiverId: string,
    prompt: string,
    token: string
): Promise<{ status: number; data?: any }> => {
    console.log('[Mocked] sendCommentReply:', { userId, receiverId, prompt })
    return { status: 200, data: { simulated: true } }
}

export const fetchRecentPosts = async (token: string): Promise<any> => {
    console.log('[Mocked] fetchRecentPosts')
    return {
        data: [
            {
                id: 'mock_post_1',
                caption: 'Loving the new features of Trigly! #automation',
                media_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop',
                media_type: 'IMAGE',
                timestamp: new Date().toISOString(),
            },
            {
                id: 'mock_post_2',
                caption: 'Reply with "Trigly" to learn more! 🚀',
                media_url: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=600&auto=format&fit=crop',
                media_type: 'IMAGE',
                timestamp: new Date().toISOString(),
            },
            {
                id: 'mock_post_3',
                caption: 'Behind the scenes at the studio today.',
                media_url: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=600&auto=format&fit=crop',
                media_type: 'IMAGE',
                timestamp: new Date().toISOString(),
            },
            {
                id: 'mock_post_4',
                caption: 'How do you handle repetitive DMs?',
                media_url: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?q=80&w=600&auto=format&fit=crop',
                media_type: 'IMAGE',
                timestamp: new Date().toISOString(),
            },
            {
                id: 'mock_post_5',
                caption: 'Our AI model is crushing these responses!',
                media_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop',
                media_type: 'IMAGE',
                timestamp: new Date().toISOString(),
            },
            {
                id: 'mock_post_6',
                caption: 'Weekend vibes. Enjoy everyone!',
                media_url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop',
                media_type: 'IMAGE',
                timestamp: new Date().toISOString(),
            }
        ]
    }
}
