import { Card, CardContent } from '&/components/ui/card'
import Image from 'next/image'

const mockSimilarNFTs = [
  { id: 1, name: 'Similar NFT 1', image: '/placeholder.svg', similarity: 0.95 },
  { id: 2, name: 'Similar NFT 2', image: '/placeholder.svg', similarity: 0.89 },
  { id: 3, name: 'Similar NFT 3', image: '/placeholder.svg', similarity: 0.82 },
]

export function SimilarNFTs() {
  return (
    <div className='space-y-4'>
      {mockSimilarNFTs.map(nft => (
        <Card
          key={nft.id}
          className='sublime-hover bg-background/80 backdrop-blur-sm'
        >
          <CardContent className='p-4 flex items-center space-x-4'>
            <Image
              src={nft.image || '/placeholder.svg'}
              alt={nft.name}
              width={64}
              height={64}
              className='rounded-lg'
            />
            <div className='flex-grow'>
              <h3 className='font-medium'>{nft.name}</h3>
              <p className='text-sm text-muted-foreground'>
                Similarity: {(nft.similarity * 100).toFixed(2)}%
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
