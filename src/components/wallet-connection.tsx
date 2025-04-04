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
  const [_walletAddress, setWalletAddress] = useState('')
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
    setIsConnecting(false)
    if (result) {
      const { address } = result
      setWalletAddress(address)
      update({ walletAddress: address })
    } else {
      toast.error('Failed to connect wallet!')
    }
  }

  if (!walletAddress) {
    return (
      <Button onClick={handleConnect}>
        {isConnecting ? (
          <Spinner />
        ) : (
          <>
            <Wallet className='w-4 h-4 mr-2' />
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
  const address = walletAddress || _walletAddress
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <Wallet className='w-4 h-4 mr-2' />
          {address.slice(0, 6)}...{address.slice(-4)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Wallet Connected</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddress}>
          <Copy className='w-4 h-4 mr-2' />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={viewOnExplorer}>
          <ExternalLink className='w-4 h-4 mr-2' />
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Balance: {balance}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
