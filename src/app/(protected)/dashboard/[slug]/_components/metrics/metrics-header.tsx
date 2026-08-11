'use client'
import React from 'react'
import { useQueryAutomations } from '@/hooks/user-queries'

const MetricsHeader = () => {
    const { data } = useQueryAutomations()
    const
        interactions = (data?.data || []).reduce((current: number, next: any) => {
            return current + (next.listener?.commentCount || 0) + (next.listener?.dmCount || 0)
        }, 0)

    return (
        <p className="text-text-secondary text-sm">
            Automated {data?.data?.length || 0} out of {interactions} interactions
        </p>
    )
}

export default MetricsHeader
