'use client'

import { Card, CardContent } from '&/components/ui/card'
import { Badge } from '&/components/ui/badge'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface UserNFTGridProps {
  nfts: any[]
  minimal?: boolean
}

export function UserNFTGrid({ nfts, minimal = false }: UserNFTGridProps) {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {nfts.map((nft, index) => (
        <motion.div
          key={`${nft.metadata.address}-${nft.metadata.token_id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className='overflow-hidden hover:shadow-lg transition-shadow'>
            <CardContent className='p-0'>
              <div className='aspect-square relative'>
                <Image
                  src={nft.metadata.token_image_url || '/placeholder.svg'}
                  alt={`NFT ${nft.metadata.token_id}`}
                  layout='fill'
                  objectFit='cover'
                  className='transition-transform hover:scale-105'
                />
              </div>
              {!minimal && (
                <div className='p-4'>
                  <h3 className='font-semibold truncate'>
                    {nft.metadata.name}
                  </h3>
                  <div className='mt-2 flex flex-wrap gap-2'>
                    <Badge variant='outline'>
                      {nft.metadata.collection_name}
                    </Badge>
                    <Badge variant='secondary'>#{nft.metadata.token_id}</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
