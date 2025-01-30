'use client'

import { useState } from 'react'
import { CollectionCard } from './collection-card'
import { CollectionDetailSheet } from './collection-detail-sheet'
import { LayoutGrid, LayoutList } from 'lucide-react'
import { Button } from '&/components/ui/button'
import { cn } from '&/lib/utils'
import type { NFTCollectionData } from '&/types'

type CollectionGridViewProps = {
  collections: NFTCollectionData[]
  onOpenDetails: (nft: NFTCollectionData) => void
}

export function CollectionGridView({ collections }: CollectionGridViewProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCollection, setSelectedCollection] =
    useState<NFTCollectionData | null>(null)

  const handleOpenDetails = (collection: NFTCollectionData) => {
    setSelectedCollection(collection)
  }

  const handleCloseDetails = () => {
    setSelectedCollection(null)
  }

  return (
    <div className='w-full'>
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
        {collections.map(collection => (
          <CollectionCard
            key={collection.metadata[0].collection_id}
            collection={collection}
            viewMode={viewMode}
            onClick={() => handleOpenDetails(collection)}
          />
        ))}
      </div>

      <CollectionDetailSheet
        collection={selectedCollection}
        onClose={handleCloseDetails}
      />
    </div>
  )
}
