import { Button } from '&/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { Wallet, ArrowRight } from 'lucide-react'

function DisconnectedWalletIcon() {
  return (
    <div className='w-24 h-24 relative'>
      <div className='absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full' />
      <div className='absolute inset-0 flex items-center justify-center'>
        <Wallet className='w-12 h-12 text-gray-500 dark:text-gray-400' />
      </div>
      <div className='absolute bottom-0 right-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center'>
        <span className='text-white font-bold text-xs'>!</span>
      </div>
    </div>
  )
}

export function WalletConnectionCard() {
  return (
    <Card className='w-full max-w-sm mx-auto'>
      <CardHeader>
        <CardTitle className='text-center'>Connect Your Wallet</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center space-y-4'>
        <DisconnectedWalletIcon />
        <p className='text-center text-muted-foreground'>
          To view your NFTs and start your collection, you need to connect your
          wallet first.
        </p>
      </CardContent>
      <CardFooter>
        <Button className='w-full group'>
          Connect Wallet
          <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
        </Button>
      </CardFooter>
    </Card>
  )
}
