import { InstagramDuoToneBlue } from "@/icons"

type Props = {
  title: string
  icon: React.ReactNode
  description: string
  strategy: 'INSTAGRAM' | 'CRM'
}

export const INTEGRATION_CARDS: Props[] = [
  {
    title: 'Connect Instagram',
    description:
      'Connect your Instagram account to start automating direct messages and comments.',
    icon: <InstagramDuoToneBlue />,
    strategy: 'INSTAGRAM',
  },
]