import { sendDM, sendPrivateMessage } from '../fetch'

export const sendDirectMessage = async (
    userId: string,
    receiverId: string,
    prompt: string,
    token: string
): Promise<{ status: number; data?: any }> => {
    return sendDM(userId, receiverId, prompt, token)
}

export const sendCommentReply = async (
    userId: string,
    receiverId: string,
    prompt: string,
    token: string
): Promise<{ status: number; data?: any }> => {
    return sendPrivateMessage(userId, receiverId, prompt, token)
}

export const fetchRecentPosts = async (token: string): Promise<any> => {
    const posts = await fetch(
        `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${token}`
    )
    const parsed = await posts.json()
    return parsed
}
