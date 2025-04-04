'use client'

import { useState } from 'react'
import { NFTCard } from './nft-card'
import { LayoutGrid, LayoutList } from 'lucide-react'
import { Button } from '&/components/ui/button'
import { cn } from '&/lib/utils'
import type { NFTData } from '&/types'

type NFTGridViewProps = {
  nfts: NFTData[]
  uploadedMedia?: string
  onOpenDetails: (nft: NFTData) => void
  onOpenUserProfile: (user: any) => void
}

export function NFTGridView({
  nfts,
  uploadedMedia,
  onOpenDetails,
  onOpenUserProfile,
}: NFTGridViewProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div>
      {uploadedMedia && (
        <div className='sticky top-14 z-50 bg-background/80 backdrop-blur-sm'>
          <div className='max-w-md mx-auto'>
            <img
              src={uploadedMedia || '/placeholder.svg'}
              alt='Uploaded NFT'
              className='w-full h-48 object-cover rounded-lg shadow-xl'
            />
          </div>
        </div>
      )}

      <div className='flex justify-end mb-6 gap-2'>
        <Button
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          size='icon'
          onClick={() => setViewMode('grid')}
        >
          <LayoutGrid className='h-4 w-4' />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size='icon'
          onClick={() => setViewMode('list')}
        >
          <LayoutList className='h-4 w-4' />
        </Button>
      </div>

      <div
        className={cn(
          'w-full',
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'flex flex-col gap-4'
        )}
      >
        {nfts.map((nft, idx) => (
          <NFTCard
            key={nft.metadata.token_id + idx}
            nft={nft}
            viewMode={viewMode}
            onClick={() => onOpenDetails(nft)}
            onOpenUserProfile={onOpenUserProfile}
          />
        ))}
      </div>
    </div>
  )
}
