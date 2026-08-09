'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useMutationData } from '@/hooks/use-mutation-data'
import { deleteAutomation } from '@/actions/automations'

export const DeleteAutomationButton = ({ id }: { id: string }) => {
    const { mutate, isPending } = useMutationData(
        ['delete-automation'],
        (data: { id: string }) => deleteAutomation(data.id),
        'user-automations'
    )

    return (
        <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 z-50 p-2 rounded-full"
            onClick={(e) => {
                e.preventDefault() // prevent navigating into the automation link
                e.stopPropagation()
                mutate({ id })
            }}
            disabled={isPending}
        >
            <Trash2 className="w-5 h-5" />
        </Button>
    )
}
