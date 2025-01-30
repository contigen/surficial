'use client'

import { useState, useEffect } from 'react'
import { Button } from '&/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '&/components/ui/dropdown-menu'
import { Wallet, Copy, ExternalLink } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { connectWallet } from '&/lib/wallet'
import { toast } from 'sonner'
import { Spinner } from './ui/spinner'

export function WalletConnection() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [balance, setBalance] = useState('')
  const { data: session, update } = useSession()
  const walletAddress = session?.user.walletAddress

  useEffect(() => {
    if (walletAddress) {
      // Fetch balance via some server action
      setBalance('1.5 ETH')
    }
  }, [])

  const handleConnect = async () => {
    setIsConnecting(true)
    const result = await connectWallet()
    if (result) {
      const { address } = result
      update({ walletAddress: address })
    } else {
      toast.error('Failed to connect wallet!')
    }
  }

  if (!walletAddress) {
    return (
      <Button onClick={handleConnect}>
        {isConnecting ? (
          Spinner
        ) : (
          <>
            <Wallet className='mr-2 h-4 w-4' />
            Connect Wallet
          </>
        )}
      </Button>
    )
  }
  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    toast.info('Address Copied', {
      description: 'Wallet address copied to clipboard.',
    })
  }

  const viewOnExplorer = () => {
    window.open(`https://etherscan.io/address/${walletAddress}`, '_blank')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <Wallet className='mr-2 h-4 w-4' />
          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Wallet Connected</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddress}>
          <Copy className='mr-2 h-4 w-4' />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={viewOnExplorer}>
          <ExternalLink className='mr-2 h-4 w-4' />
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Balance: {balance}</DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
