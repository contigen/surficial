'use client'

import { Avatar, AvatarFallback, AvatarImage } from '&/components/ui/avatar'
import { Button } from '&/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '&/components/ui/dropdown-menu'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

export function UserNav() {
  const { data: session } = useSession()
  const email = session?.user.email!
  const walletAddress = session?.user.walletAddress
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={`https://avatar.vercel.sh/${walletAddress || ''}`}
              alt='user profile image'
            />
            <AvatarFallback>
              {walletAddress?.slice(2, 4).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 mt-3' align='end' forceMount>
        <DropdownMenuLabel>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>Email</p>
            <p className='text-xs leading-none text-muted-foreground font-semibold'>
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href='/dashboard'>Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/settings'>Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
