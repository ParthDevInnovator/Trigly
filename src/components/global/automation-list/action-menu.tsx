'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Trash2, Edit2 } from 'lucide-react'
import { useMutationData } from '@/hooks/use-mutation-data'
import { deleteAutomation } from '@/actions/automations'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePaths } from '@/hooks/user-nav'
import { useRouter } from 'next/navigation'

export const ActionMenu = ({ id }: { id: string }) => {
    const router = useRouter()
    const { pathname } = usePaths()
    const { mutate, isPending } = useMutationData(
        ['delete-automation'],
        (data: { id: string }) => deleteAutomation(data.id),
        'user-automations'
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 z-50 text-gray-400 hover:text-white" onClick={(e) => { e.preventDefault(); e.stopPropagation() }}>
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1D1D1D] z-50 border-gray-800 text-white">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-800 flex gap-2 items-center"
                    onSelect={(e) => {
                        e.preventDefault()
                        router.push(`${pathname}/${id}`)
                    }}
                >
                    <Edit2 className="w-4 h-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer hover:bg-red-500/10 text-red-500 flex gap-2 items-center"
                    onSelect={(e) => {
                        e.preventDefault()
                        import('sweetalert2').then((module) => {
                            const Swal = module.default
                            document.body.click() // close the dropdown manually
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#333336',
                                cancelButtonColor: '#ef4444',
                                confirmButtonText: 'Yes, delete it!',
                                background: '#1D1D1D',
                                color: '#ffffff'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    mutate({ id })
                                }
                            })
                        })
                    }}
                    disabled={isPending}
                >
                    <Trash2 className="w-4 h-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
