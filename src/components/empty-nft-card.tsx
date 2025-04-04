import { Button } from '&/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { Plus } from 'lucide-react'

function PixelatedNFT() {
  const pixels = 16
  const pixelArray = Array.from({ length: pixels * pixels })

  return (
    <div className='w-full aspect-square relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-600'>
      <div
        className='absolute inset-0 grid'
        style={{ gridTemplateColumns: `repeat(${pixels}, 1fr)` }}
      >
        {pixelArray.map((_, index) => (
          <div
            key={index}
            className='bg-gray-400 dark:bg-gray-500'
            style={{
              opacity: Math.random() * 0.5 + 0.25,
            }}
          />
        ))}
      </div>
      <div className='absolute inset-0 flex items-center justify-center'>
        <span className='text-4xl font-bold text-white mix-blend-difference'>
          ?
        </span>
      </div>
    </div>
  )
}

export function EmptyNFTCard() {
  return (
    <Card className='w-full max-w-sm mx-auto overflow-hidden'>
      <CardHeader>
        <CardTitle className='text-center'>No NFTs Yet</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center p-0'>
        <PixelatedNFT />
        <div className='p-6'>
          <p className='text-center text-muted-foreground'>
            You don't have any NFTs in your collection yet.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full group'>
          <Plus className='mr-2 h-4 w-4 transition-transform group-hover:rotate-90' />
          <span className='relative'>
            <span className='block transition-opacity group-hover:opacity-0 group-hover:translate-y-1'>
              Create Your First NFT
            </span>
            <span className='absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100 group-hover:-translate-y-1'>
              Let's Get Started!
            </span>
          </span>
        </Button>
      </CardFooter>
    </Card>
  )
}
