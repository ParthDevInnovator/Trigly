import AutomationList from '@/components/global/automation-list'
import React from 'react'

type Props = {}

const Page = (props: Props) => {

  return (
    <div className="flex flex-col gap-y-6">
      <AutomationList />
    </div>
  )
}

export default Page