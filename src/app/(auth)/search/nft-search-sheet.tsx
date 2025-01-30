'use client'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '&/components/ui/drawer'
import { Badge } from '&/components/ui/badge'
import { Button } from '&/components/ui/button'
import { Separator } from '&/components/ui/separator'
import { Clock, DollarSign, ExternalLink, Hash, Link, Zap } from 'lucide-react'

type NFTSearchSheetProps = {
  isOpen: boolean
  onClose: () => void
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
  timeLeft: string
  listedAt: string
  discount: number
}

export function NFTSearchSheet(props: NFTSearchSheetProps) {
  const accentColor = props.thumbnail_palette[0] || ''

  return (
    <Drawer open={props.isOpen} onOpenChange={props.onClose}>
      <DrawerContent className='p-0 overflow-hidden'>
        <div className='overflow-y-auto'>
          <div className='h-64'>
            <img
              src={props.thumbnail_url || '/placeholder.svg'}
              alt={`${props.collection_name} #${props.token_id}`}
              className='object-cover w-full h-full'
            />
          </div>
          <section className='p-6 space-y-6'>
            <DrawerHeader>
              <DrawerTitle>{props.collection_name}</DrawerTitle>
              <DrawerDescription>Token #{props.token_id}</DrawerDescription>
            </DrawerHeader>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-sm font-medium'>Listed Price</p>
                <p className='text-2xl font-bold'>
                  {props.listed_eth_price.toFixed(3)} ETH
                </p>
              </div>
              <div>
                <p className='text-sm font-medium'>Estimated Value</p>
                <p className='text-2xl font-bold'>
                  {props.estimated_eth_price.toFixed(3)} ETH
                </p>
              </div>
            </div>
            <Badge
              className='w-full justify-center text-lg py-1'
              style={{ backgroundColor: accentColor }}
            >
              {props.discount.toFixed(2)}% Discount
            </Badge>
            <Separator />
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='flex items-center'>
                  <Clock className='w-4 h-4 mr-2' />
                  Time Left
                </span>
                <span>{props.timeLeft}</span>
              </div>
              <div className='flex justify-between'>
                <span className='flex items-center'>
                  <DollarSign className='w-4 h-4 mr-2' />
                  Listed
                </span>
                <span>{props.listedAt}</span>
              </div>
              <div className='flex justify-between'>
                <span className='flex items-center'>
                  <Zap className='w-4 h-4 mr-2' />
                  Deal Score
                </span>
                <span>{props.deal_score.toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='flex items-center'>
                  <Hash className='w-4 h-4 mr-2' />
                  Chain ID
                </span>
                <span>{props.chain_id}</span>
              </div>
            </div>
            <Separator />
            <div className='space-y-2'>
              <p className='text-sm font-medium'>Contract Address</p>
              <p className='text-xs text-muted-foreground break-all'>
                {props.contract_address}
              </p>
            </div>
            <Button className='w-full' asChild>
              <a
                href={`https://${props.marketplace}.io/assets/${props.contract_address}/${props.token_id}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                View on {props.marketplace}
                <ExternalLink className='size-4 mr-2' />
              </a>
            </Button>
          </section>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
