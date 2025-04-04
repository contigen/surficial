'use client'

import { Badge } from '&/components/ui/badge'
import { Card, CardContent } from '&/components/ui/card'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { Verified, Zap, BarChart2, User, BadgeInfo } from 'lucide-react'
import { cn } from '&/lib/utils'
import type { NFTData } from '&/types'
import { Button } from '&/components/ui/button'

type NFTCardProps = {
  nft: NFTData
  viewMode: 'grid' | 'list'
  onClick: () => void
  onOpenUserProfile: (user: any) => void
}

export function NFTCard({
  nft,
  viewMode,
  onClick,
  onOpenUserProfile,
}: NFTCardProps) {
  const palette = nft.metadata.thumbnail_palette
  const primaryColor = palette[0]
  const secondaryColor = palette[1]

  const cardStyle = {
    '--card-gradient': `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)`,
    '--card-border': `${primaryColor}30`,
    '--card-shadow': `${primaryColor}20`,
  } as React.CSSProperties

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          'group cursor-pointer overflow-hidden transition-all duration-300',
          'hover:shadow-lg border border-[--card-border]',
          'bg-[--card-gradient]',
          viewMode === 'list' ? 'flex' : ''
        )}
        style={cardStyle}
        onClick={onClick}
      >
        <CardContent
          className={cn('p-0', viewMode === 'list' ? 'flex gap-4 p-4' : '')}
        >
          <div
            className={cn(
              'relative overflow-hidden',
              viewMode === 'grid'
                ? 'aspect-square w-full'
                : 'h-24 w-24 rounded-xl'
            )}
          >
            <img
              src={nft.metadata.token_image_url || '/placeholder.svg'}
              alt={nft.metadata.name}
              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
            />
          </div>

          <div
            className={cn('space-y-2', viewMode === 'grid' ? 'p-4' : 'flex-1')}
          >
            <div className='flex items-center justify-between'>
              <h3 className='font-bold tracking-tight text-lg'>
                {nft.metadata.name}
              </h3>
              {nft.metadata.verified ? (
                <Verified className='h-4 w-4 text-blue-500' />
              ) : (
                <BadgeInfo className='h-6 w-6 text-red-500' />
              )}
            </div>

            <p className='text-sm text-muted-foreground'>
              {nft.metadata.collection_name}
            </p>

            <div className='flex flex-wrap gap-2'>
              <Badge
                variant='secondary'
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                Rank #{nft.metadata.rarity_rank}
              </Badge>
              {nft.metadata.minted_date && (
                <Badge variant='outline'>
                  Minted{' '}
                  {formatDistanceToNow(new Date(nft.metadata.minted_date), {
                    addSuffix: true,
                  })}
                </Badge>
              )}
            </div>
            <div className='flex justify-between items-center text-sm'>
              <span className='flex items-center gap-1'>
                <Zap className='h-4 w-4' />
                {nft.analytics[0].sales} sales
              </span>
              <span className='flex items-center gap-1'>
                <BarChart2 className='h-4 w-4' />$
                {nft.analytics[0].volume.toFixed(2)}
              </span>
            </div>
            <div className='mt-2 flex justify-between items-center'>
              <Button
                variant='ghost'
                size='sm'
                onClick={e => {
                  e.stopPropagation()
                  onOpenUserProfile({
                    address: nft.metadata.owned_by,
                    nfts: [nft],
                    stats: {
                      totalNFTs: nft.analytics[0].assets,
                      totalCollections: 1,
                      totalValue: Number.parseFloat(
                        nft.metadata.price_latest.value
                      ),
                      firstTransaction: nft.metadata.minted_date,
                    },
                  })
                }}
              >
                <User className='mr-2 h-4 w-4' />
                View Owner
              </Button>
              <span className='text-sm font-semibold'>
                {Number.parseFloat(
                  nft.metadata.price_latest.value === `NA`
                    ? nft.metadata.price_fair_estimate.value
                    : nft.metadata.price_latest.value
                ).toFixed(2)}
                &nbsp;
                {nft.metadata.price_latest.unit.toUpperCase()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
