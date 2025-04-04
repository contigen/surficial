'use client'

import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '&/components/ui/card'
import { Badge } from '&/components/ui/badge'
import { Button } from '&/components/ui/button'
import { NFTSearchSheet } from './nft-search-sheet'
import { formatDistanceToNow } from 'date-fns'
import { Clock, DollarSign, Zap } from 'lucide-react'

type NFTCardProps = {
  chain_id: string
  closing_timestamp: string
  collection_name: string
  contract_address: string
  deal_score: number
  estimated_eth_price: number
  listed_eth_price: number
  listing_timestamp: string
  marketplace: string
  thumbnail_palette: string[]
  thumbnail_url: string
  token_id: string
}

export function NFTSearchCard(props: NFTCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const accentColor = props.thumbnail_palette[0] || '#000000'
  const timeLeft = formatDistanceToNow(new Date(props.closing_timestamp), {
    addSuffix: true,
  })
  const listedAt = formatDistanceToNow(new Date(props.listing_timestamp), {
    addSuffix: true,
  })
  const discount =
    ((props.estimated_eth_price - props.listed_eth_price) /
      props.estimated_eth_price) *
    100

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
      >
        <Card className='overflow-hidden'>
          <CardContent className='p-0'>
            <div className='relative'>
              <img
                src={props.thumbnail_url || '/placeholder.svg'}
                alt={`${props.collection_name} #${props.token_id}`}
                className='object-cover w-full h-48'
              />
              <Badge
                className='absolute top-2 right-2'
                style={{ backgroundColor: accentColor }}
              >
                {props.marketplace}
              </Badge>
            </div>
            <div className='p-4 space-y-2'>
              <h3 className='font-bold truncate'>{props.collection_name}</h3>
              <p className='text-sm text-muted-foreground'>#{props.token_id}</p>
              <div className='flex items-center justify-between'>
                <span className='flex items-center'>
                  <DollarSign className='w-4 h-4 mr-1' />
                  {props.listed_eth_price.toFixed(3)} ETH
                </span>
                <Badge variant='outline' className='text-green-500'>
                  {discount.toFixed(2)}% off
                </Badge>
              </div>
              <div className='flex justify-between text-sm text-muted-foreground'>
                <span className='flex items-center'>
                  <Clock className='w-4 h-4 mr-1' />
                  {timeLeft}
                </span>
                <span className='flex items-center'>
                  <Zap className='w-4 h-4 mr-1' />
                  Deal Score: {props.deal_score.toFixed(2)}
                </span>
              </div>
              <Button
                className='w-full mt-2'
                style={{ backgroundColor: accentColor }}
                onClick={() => setIsDetailOpen(true)}
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <NFTSearchSheet
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        {...props}
        timeLeft={timeLeft}
        listedAt={listedAt}
        discount={discount}
      />
    </>
  )
}
