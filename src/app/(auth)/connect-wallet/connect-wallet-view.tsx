'use client'

import { Fragment, useState } from 'react'
import { Button } from '&/components/ui/button'
import { BadgeCheck, Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Spinner } from '&/components/ui/spinner'
import { connectWallet } from '&/lib/wallet'
import { useSession } from 'next-auth/react'

export function ConnectWalletView() {
  const [isConnecting, setIsConnecting] = useState(false)
  const { data: session, update } = useSession()
  const router = useRouter()
  const walletAddress = session?.user.walletAddress

  const handleConnect = async () => {
    setIsConnecting(true)
    const result = await connectWallet()
    setIsConnecting(false)
    if (result) {
      const { address } = result
      await update({
        ...session,
        user: { ...session?.user, walletAddress: address },
      })
      toast.success('Wallet Connected', {
        description: 'Successfully connected Wallet',
      })
      router.refresh()
    } else {
      toast.error('Failed to connect wallet')
    }
  }
  return (
    <>
      <Button
        className='flex items-center justify-center w-full'
        onClick={handleConnect}
        disabled={isConnecting}
      >
        {walletAddress ? (
          <span className='inline-flex items-center gap-2'>
            <BadgeCheck className='size-4' />
            <span>{walletAddress.slice(0, 20)}...</span>
          </span>
        ) : isConnecting ? (
          <Spinner />
        ) : (
          <>
            <Wallet className='w-4 h-4 mr-2' />
            Connect MetaMask
          </>
        )}
      </Button>
      {['WalletConnect', 'Coinbase Wallet'].map(wallet => (
        <Fragment key={wallet}>
          <Button className='w-full' variant='outline' disabled>
            <Wallet className='w-4 h-4 mr-2' />
            Connect {wallet}
          </Button>
        </Fragment>
      ))}
    </>
  )
}
