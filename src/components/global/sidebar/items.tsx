import { SIDEBAR_MENU } from '@/constants/menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

type Props = {
  page: string
  slug: string
}

const Items = ({ page, slug }: Props) => {
  const [clickedItem, setClickedItem] = useState<string | null>(null)

  useEffect(() => {
    setClickedItem(null)
  }, [page])

  return SIDEBAR_MENU.map((item) => (
    <Link
      key={item.id}
      href={`/dashboard/${slug}${item.label === 'home' ? '' : `/${item.label}`}`}
      onClick={() => setClickedItem(item.id)}
      className={cn(
        'capitalize flex gap-x-2 rounded-full p-3 hover:bg-[#0f0f0f] transition-colors',
        page === item.label && 'bg-[#0f0f0f]',
        page === slug && item.label === 'home'
          ? 'bg-[#0f0f0f]'
          : 'text-[#9B9CA0]'
      )}
    >
      {clickedItem === item.id ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        item.icon
      )}
      {item.label}
    </Link>
  ))
}

export default Items