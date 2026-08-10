'use server'

import { redirect } from 'next/navigation'
import { onCurrentUser } from '../user'
import { createIntegration, getIntegration } from './queries'
import { generateTokens } from '@/lib/fetch'
import axios from 'axios'
import { isDemoMode } from '@/lib/config'

export const onOAuthInstagram = async (strategy: 'INSTAGRAM' | 'CRM') => {
  if (strategy === 'INSTAGRAM') {
    if (isDemoMode() || !process.env.INSTAGRAM_EMBEDDED_OAUTH_URL) {
      return redirect('/callback/instagram?code=demo_mode')
    }
    return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
  }
}

export const onIntegrate = async (code: string) => {
  const user = await onCurrentUser()
  try {
    const integration = await getIntegration(user.id)
    if (integration && integration.integrations.length === 0) {
      if (isDemoMode() && code === 'demo_mode') {
        const today = new Date()
        const expire_date = today.setDate(today.getDate() + 60)
        const create = await createIntegration(
          user.id,
          'demo_access_token12345',
          new Date(expire_date),
          'demo_insta_id'
        )
        return { status: 200, data: create }
      }

      const token = await generateTokens(code)
      console.log(token)
      if (token) {
        const insta_id = await axios.get(
          `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
        )
        const today = new Date()
        const expire_date = today.setDate(today.getDate() + 60)
        const create = await createIntegration(
          user.id,
          token.access_token,
          new Date(expire_date),
          insta_id.data.user_id
        )
        return { status: 200, data: create }
      }
      console.log('🔴 401')
      return { status: 401 }
    }
    console.log('🔴 404')
    return { status: 404 }
  } catch (error) {
    console.log('🔴 500', error)
    return { status: 500 }
  }
}