'use client'

import { Badge } from '&/components/ui/badge'
import { Card, CardContent } from '&/components/ui/card'
import { motion } from 'framer-motion'
import { formatDistanceToNow, isValid } from 'date-fns'
import { Zap, BarChart2, Users } from 'lucide-react'
import { cn, parseCloseColours } from '&/lib/utils'
import type { NFTCollectionData } from '&/types'

type CollectionCardProps = {
  collection: NFTCollectionData
  viewMode: 'grid' | 'list'
  onClick: () => void
}

export function CollectionCard({
  collection,
  viewMode,
  onClick,
}: CollectionCardProps) {
  const metadata = collection.metadata[0]
  const analytics = collection.analytics[0]
  const holders = collection.holders[0]

  const colors = parseCloseColours(metadata.close_colours)

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='p-2 rounded-2xl'
      style={{
        backgroundImage: `linear-gradient(45deg, ${colors.join(', ')})`,
      }}
    >
      <Card
        className={cn(
          'group cursor-pointer overflow-hidden transition-all duration-300 rounded-xl border-0',
          viewMode === 'list' ? 'flex' : ''
        )}
        onClick={onClick}
      >
        <CardContent
          className={cn('p-0', viewMode === 'list' ? 'flex gap-4 p-4' : '')}
        >
          <div
            className={cn(
              'relative overflow-hidden',
              viewMode === 'grid'
                ? 'aspect-video w-full'
                : 'h-24 w-40 rounded-lg'
            )}
          >
            <img
              src={metadata.banner_image_url || '/placeholder.svg'}
              alt={metadata.collection}
              className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-110'
            />
          </div>

          <div
            className={cn('space-y-2', viewMode === 'grid' ? 'p-4' : 'flex-1')}
          >
            <h3 className='text-lg font-bold tracking-tight'>
              {metadata?.collection}
            </h3>

            <p className='text-sm text-muted-foreground'>{metadata?.brand}</p>

            <div className='flex flex-wrap gap-2'>
              <Badge variant='secondary'>{metadata?.blockchain}</Badge>
              <Badge variant='outline'>{metadata?.contract_type}</Badge>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span className='flex items-center gap-1'>
                <Zap className='w-4 h-4' />
                {analytics?.sales?.toLocaleString() || 'Unknown'} sales
              </span>
              <span className='flex items-center gap-1'>
                <BarChart2 className='w-4 h-4' />$
                {analytics?.volume.toLocaleString() || 0}
              </span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span className='flex items-center gap-1'>
                <Users className='w-4 h-4' />
                {holders?.holders || 'Unknown'} holders
              </span>
              <span className='text-xs text-muted-foreground'>
                Created{' '}
                {isValid(metadata.contract_created_date)
                  ? formatDistanceToNow(
                      new Date(metadata.contract_created_date),
                      {
                        addSuffix: true,
                      }
                    )
                  : `Unknown`}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
