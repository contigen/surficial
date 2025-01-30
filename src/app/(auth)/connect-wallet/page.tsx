'use client'

import { useState } from 'react'
import { Button } from '&/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Spinner } from '&/components/ui/spinner'
import { connectWallet } from '&/lib/wallet'
import { useSession } from 'next-auth/react'

export default function ConnectWalletPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const { update } = useSession()
  const router = useRouter()

  const handleConnect = async () => {
    setIsConnecting(true)
    const result = await connectWallet()
    setIsConnecting(false)
    if (result) {
      const { address } = result
      update({ walletAddress: address })
      toast.success('Wallet Connected', {
        description: 'Successfully connected Wallet',
      })
      router.push('/dashboard')
    } else {
      toast.error('Failed to connect wallet!')
    }
  }

  return (
    <div className='container mx-auto py-10 flex justify-center items-center min-h-screen'>
      <Card className='w-full max-w-md sublime-hover bg-background/80 backdrop-blur-sm'>
        <CardHeader>
          <CardTitle className='text-2xl text-center sublime-text'>
            Connect Your Wallet
          </CardTitle>
          <CardDescription className='text-center'>
            Choose a wallet to connect to Surficial
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Button
            className='w-full flex items-center justify-center'
            onClick={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting ? (
              Spinner
            ) : (
              <>
                <Wallet className='mr-2 h-4 w-4' />
                Connect MetaMask
              </>
            )}
          </Button>
          {['WalletConnect', 'Coinbase Wallet'].map(wallet => (
            <Button className='w-full' variant='outline' disabled>
              <Wallet className='mr-2 h-4 w-4' />
              Connect {wallet}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
