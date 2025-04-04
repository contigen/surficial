import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { ConnectWalletView } from './connect-wallet-view'

export default function ConnectWalletPage() {
  return (
    <div className='flex justify-center items-center h-[calc(100vh-30px)]'>
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
          <ConnectWalletView />
        </CardContent>
      </Card>
    </div>
  )
}
