import { Badge } from '&/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '&/components/ui/tooltip'
import { Info } from 'lucide-react'

type WalletOwnershipStatusProps = {
  ownerAddress: string
  connectedWalletAddress: string
}

export function WalletOwnershipStatus({
  ownerAddress,
  connectedWalletAddress,
}: WalletOwnershipStatusProps) {
  const isOwner =
    ownerAddress.toLowerCase() === connectedWalletAddress.toLowerCase()

  return (
    <div className='flex items-center space-x-2'>
      <h3 className='font-semibold'>Ownership Status:</h3>
      {isOwner ? (
        <Badge>You own this NFT</Badge>
      ) : (
        <Badge variant='secondary'>Not owned by you</Badge>
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Info className='h-4 w-4 text-muted-foreground' />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              This shows whether the currently connected wallet owns this NFT.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
