'use client'
import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

export const LoginButton = () => {
    const { isSignedIn } = useUser()
    if (isSignedIn) {
        return (
            <Link href="/dashboard">
                <Button className="bg-white text-black hover:bg-white/90 font-bold">
                    Dashboard
                </Button>
            </Link>
        )
    }
    return (
        <SignInButton mode="modal">
            <Button className="bg-white text-black hover:bg-white/90 font-bold">Login</Button>
        </SignInButton>
    )
}

export const GetStartedButton = ({ size = 'lg', className = '' }: { size?: 'lg' | 'default', className?: string }) => {
    const { isSignedIn } = useUser()
    if (isSignedIn) {
        return (
            <Link href="/dashboard">
                <Button size={size} className={className || 'bg-blue-600 text-white hover:bg-blue-700'}>
                    Go to Dashboard
                </Button>
            </Link>
        )
    }
    return (
        <SignUpButton mode="modal">
            <Button size={size} className={className || 'bg-blue-600 text-white hover:bg-blue-700'}>
                Get Started
            </Button>
        </SignUpButton>
    )
}
