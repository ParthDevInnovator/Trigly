import { isDemoMode } from '../config'
import * as mockAPI from './mock'
import * as realAPI from './real'

export const sendDirectMessage = async (
    userId: string,
    receiverId: string,
    prompt: string,
    token: string
) => {
    if (isDemoMode()) {
        return mockAPI.sendDirectMessage(userId, receiverId, prompt, token)
    }
    return realAPI.sendDirectMessage(userId, receiverId, prompt, token)
}

export const sendCommentReply = async (
    userId: string,
    receiverId: string,
    prompt: string,
    token: string
) => {
    if (isDemoMode()) {
        return mockAPI.sendCommentReply(userId, receiverId, prompt, token)
    }
    return realAPI.sendCommentReply(userId, receiverId, prompt, token)
}

export const fetchRecentPosts = async (token: string) => {
    if (isDemoMode()) {
        return mockAPI.fetchRecentPosts(token)
    }
    return realAPI.fetchRecentPosts(token)
}
