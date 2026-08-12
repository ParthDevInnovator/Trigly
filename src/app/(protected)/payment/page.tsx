import { redirect } from 'next/navigation'
import React from 'react'
import { onSubscribe } from '@/actions/user'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {
  searchParams: Promise<{
    session_id?: string
    cancel?: boolean
  }>
}

const Page = async ({ searchParams }: Props) => {
  const { cancel, session_id } = await searchParams;

  if (session_id) {
    const customer = await onSubscribe(session_id)

    if (customer.status === 200) {
      return redirect('/dashboard')
    }

    return (
      <div className="flex flex-col justify-center items-center h-screen w-full bg-background-90">
        <div className="bg-background-80 p-8 rounded-xl shadow-lg flex flex-col items-center max-w-md text-center">
          <h4 className="text-4xl font-bold text-red-500 mb-4">Payment Failed</h4>
          <p className="text-text-secondary mb-8">
            Oops! We couldn't process your subscription upgrade. Please try again.
          </p>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (cancel) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full bg-background-90">
        <div className="bg-background-80 p-8 rounded-xl shadow-lg flex flex-col items-center max-w-md text-center">
          <h4 className="text-4xl font-bold text-yellow-500 mb-4">Payment Cancelled</h4>
          <p className="text-text-secondary mb-8">
            You cancelled the checkout process. None of your cards were charged.
          </p>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return redirect('/dashboard')
}

export default Page