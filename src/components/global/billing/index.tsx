'use client'
import React from 'react'
import PaymentCard from './payment-card'
import { useQueryUser } from '@/hooks/user-queries'

type Props = {}

const Billing = (props: Props) => {
  const { data } = useQueryUser()
  const plan = (data?.data?.subscription?.plan ?? 'FREE') as 'PRO' | 'FREE'
  return (
    <div className="flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container">
      <PaymentCard
        current={plan}
        label="PRO"
      />
      <PaymentCard
        current={plan}
        label="FREE"
      />
    </div>
  )
}

export default Billing