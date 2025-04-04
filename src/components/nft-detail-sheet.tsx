'use client'

import { Fragment, useState } from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '&/components/ui/tabs'
import { Badge } from '&/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '&/components/ui/tooltip'
import { ScrollArea } from '&/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '&/components/ui/table'
import { formatDistanceToNow, format } from 'date-fns'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts'
import {
  BarChart3,
  Clock,
  CreditCard,
  ExternalLink,
  Eye,
  Info,
  Share2,
  Shield,
  Verified,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BadgeInfo,
  Link,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NFTData } from '&/types'
import { getNetworkName } from '&/lib/utils'

type NFTDetailSheetProps = {
  data: NFTData
  onClose: () => void
  isUploaded?: boolean
}

export function NFTDetailSheet({
  data,
  onClose,
  isUploaded = false,
}: NFTDetailSheetProps) {
  const [activeTab, setActiveTab] = useState('overview')

  if (!data) return null

  const palette = data.metadata.thumbnail_palette

  const formatChange = (value: number) => {
    const formattedValue = (value * 100).toFixed(2)
    return (
      <span className={value >= 0 ? 'text-green-500' : 'text-red-500'}>
        {value >= 0 ? (
          <ArrowUpRight className='inline mr-1 h-4 w-4' />
        ) : (
          <ArrowDownRight className='inline mr-1 h-4 w-4' />
        )}
        {formattedValue}%
      </span>
    )
  }

  const renderSocialMediaLinks = () => {
    return data.metadata.social_media
      .filter(social => social.url !== 'NA')
      .map(social => (
        <a
          key={social.platform}
          href={social.url}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Badge variant='outline' className='flex items-center gap-1'>
            {social.platform}
            <ExternalLink className='size-3' />
          </Badge>
        </a>
      ))
  }

  const renderMarketplaceLinks = () => {
    const { token_id, chain_id, address } = data.metadata
    const blockchain = getNetworkName(chain_id)
    const marketplaceLinks = [
      {
        name: 'opensea',
        url: `https://opensea.io/assets/${blockchain}/${address}/${token_id}`,
      },
      {
        name: 'blur',
        url: `https://blur.io/${blockchain.slice(
          0,
          3
        )}/asset/${address}/${token_id}`,
      },
      {
        name: 'looksrare',
        url: `https://looksrare.org/collections/${address}/${token_id}`,
      },
    ]
    return marketplaceLinks.map((link, idx) => (
      <a key={idx} href={link.url} target='_blank' rel='noopener noreferrer'>
        <Badge variant='secondary' className='flex items-center gap-1'>
          {link.name}
          <ExternalLink className='size-3' />
        </Badge>
      </a>
    ))
  }

  const renderPriceHistory = () => {
    const priceData = data.scores?.map(score => ({
      startPrice: score.start_price,
      price: score.price,
      maxPrice: score.max_price,
      priceCeiling: score.price_ceiling,
      estimatedPrice: score.estimated_price,
      allTimeLow: score.all_time_low,
    }))

    return (
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={priceData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <RechartsTooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='price'
            stroke='#8884d8'
            name='Current Price'
          />
          <Line
            type='monotone'
            dataKey='maxPrice'
            stroke='#82ca9d'
            name='Max Price'
          />
          <Line
            type='monotone'
            dataKey='priceCeiling'
            stroke='#ffc658'
            name='Price Ceiling'
          />
          <Line
            type='monotone'
            dataKey='estimatedPrice'
            stroke='#ff7300'
            name='Estimated Price'
          />
          <Line
            type='monotone'
            dataKey='allTimeLow'
            stroke='#d0ed57'
            name='All Time Low'
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  const renderOverviewContent = () => {
    return (
      <>
        <div className='grid grid-cols-2 gap-4'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Clock className='h-4 w-4' />
                Minted
              </CardTitle>
            </CardHeader>
            <CardContent>
              {formatDistanceToNow(new Date(data.metadata.minted_date), {
                addSuffix: true,
              })}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Eye className='h-4 w-4' />
                Rarity
              </CardTitle>
            </CardHeader>
            <CardContent>Rank #{data.metadata.rarity_rank}</CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Shield className='h-4 w-4' />
              Ownership
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>
                Current Owner
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant='outline' className='font-mono'>
                      {data.metadata.owned_by.slice(0, 6)}...
                      {data.metadata.owned_by.slice(-4)}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to copy address</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>
                Hold Duration
              </span>
              <Badge variant='secondary'>
                {data.metadata.hold_time_current} days
              </Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>Past Owners</span>
              <Badge variant='secondary'>
                {data.metadata.past_owner_count}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <CreditCard className='h-4 w-4' />
              Price Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>
                Latest Price
              </span>
              <Badge>
                {data.metadata.price_latest.value === 'NA' ? (
                  'N.A.'
                ) : (
                  <>
                    {Number.parseFloat(
                      data.metadata.price_latest.value
                    ).toFixed(2)}
                    &nbsp;
                    {data.metadata.price_latest.unit.toUpperCase()}
                  </>
                )}
              </Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>
                Estimated Value
              </span>
              <Badge variant='outline'>
                {data.metadata.price_fair_estimate.value === 'NA' ? (
                  'N.A.'
                ) : (
                  <>
                    {Number.parseFloat(
                      data.metadata.price_fair_estimate.value
                    ).toFixed(2)}
                    &nbsp;
                    {data.metadata.price_fair_estimate.unit.toUpperCase()}
                  </>
                )}
              </Badge>
            </div>
            {isUploaded && (
              <>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Similarity Score
                  </span>
                  <Badge variant='secondary'>
                    {data.similarity_score &&
                      (data.similarity_score.value * 100).toFixed(2)}
                    %
                  </Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Similarity Category
                  </span>
                  <Badge>
                    {data.similarity_category && data.similarity_category.value}
                  </Badge>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </>
    )
  }

  const renderAnalyticsContent = () => {
    return (
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <BarChart3 className='h-4 w-4' />
              Trading Activity
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            {data.analytics?.map(analytic => (
              <div
                key={crypto.randomUUID()}
                className='border-b pb-2 last:border-b-0'
              >
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Total Sales
                  </span>
                  <Badge variant='secondary'>{analytic.sales}</Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Sales Change
                  </span>
                  <Badge variant='outline'>
                    {formatChange(analytic.sales_change)}
                  </Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Total Transactions
                  </span>
                  <Badge variant='secondary'>{analytic.transactions}</Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Transactions Change
                  </span>
                  <Badge variant='outline'>
                    {formatChange(analytic.transactions_change)}
                  </Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Total Transfers
                  </span>
                  <Badge variant='secondary'>{analytic.transfers}</Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Transfers Change
                  </span>
                  <Badge variant='outline'>
                    {formatChange(analytic.transfers_change)}
                  </Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Total Volume
                  </span>
                  <Badge variant='secondary'>
                    ${analytic.volume.toFixed(2)}
                  </Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Volume Change
                  </span>
                  <Badge variant='outline'>
                    {formatChange(analytic.volume_change)}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Users className='h-4 w-4' />
              Trader Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            {data.traders?.map(trader => (
              <div
                key={crypto.randomUUID()}
                className='border-b pb-2 last:border-b-0'
              >
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Total Traders
                  </span>
                  <Badge variant='secondary'>{trader.traders}</Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Unique Buyers
                  </span>
                  <Badge variant='secondary'>{trader.traders_buyers}</Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Unique Sellers
                  </span>
                  <Badge variant='secondary'>{trader.traders_sellers}</Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Traders Change
                  </span>
                  <Badge variant='outline'>
                    {formatChange(trader.traders_change)}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <TrendingUp className='h-4 w-4' />
              Price History
            </CardTitle>
          </CardHeader>
          <CardContent>{renderPriceHistory()}</CardContent>
        </Card>
      </Fragment>
    )
  }

  const renderHistoryContent = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {data.transactions?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.transactions?.map((transaction: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      {transaction.transaction_type || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {transaction.timestamp
                        ? format(new Date(transaction.timestamp), 'PPP')
                        : 'N/A'}
                    </TableCell>
                    <TableCell className='font-mono'>
                      {transaction.sending_address
                        ? `${transaction.sending_address.slice(
                            0,
                            6
                          )}...${transaction.sending_address.slice(-4)}`
                        : 'N/A'}
                    </TableCell>
                    <TableCell className='font-mono'>
                      {transaction.receiving_address
                        ? `${transaction.receiving_address.slice(
                            0,
                            6
                          )}...${transaction.receiving_address.slice(-4)}`
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {transaction.sale_price_usd
                        ? `$${transaction.sale_price_usd}`
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No transaction history available for this NFT.</p>
          )}
        </CardContent>
      </Card>
    )
  }

  const renderTraitsContent = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Info className='h-4 w-4' />
            Traits
          </CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-2 gap-4'>
          {data.traits?.traits?.map((trait, index) => (
            <div key={index} className='bg-muted rounded-lg p-3 space-y-1'>
              <p className='text-sm font-medium'>{trait.trait_type}</p>
              <p className='text-sm text-muted-foreground'>{trait.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  const renderProfileContent = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>NFT Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Profile information for individual NFTs is not available in the
            current dataset.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Drawer open={!!data} onOpenChange={onClose}>
      <DrawerContent className='overflow-hidden p-0'>
        <ScrollArea className='overflow-y-auto'>
          <div className='flex flex-col h-full'>
            <div
              className='relative h-64'
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${palette[0]}40, ${palette[1]}40)`,
              }}
            >
              <div className='absolute inset-0 flex items-center justify-center my-4'>
                <motion.img
                  src={data.metadata.token_image_url}
                  alt={data.metadata.name}
                  className='max-h-full max-w-full object-contain shadow-2xl rounded-2xl'
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className='p-6 space-y-6'>
              <DrawerHeader>
                <div className='flex items-center justify-between mr-4'>
                  <DrawerTitle className='text-3xl font-bold'>
                    {data.metadata.name}
                  </DrawerTitle>
                  {data.metadata.verified ? (
                    <Verified className='h-6 w-6 text-blue-500' />
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <BadgeInfo className='h-6 w-6 text-red-500' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Unverified NFT</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <p className='text-lg text-muted-foreground'>
                  {data.metadata.collection_name}
                </p>
              </DrawerHeader>

              <Tabs
                defaultValue='overview'
                className='w-full'
                onValueChange={setActiveTab}
              >
                <TabsList className='grid w-full grid-cols-5'>
                  <TabsTrigger value='overview'>Overview</TabsTrigger>
                  <TabsTrigger value='analytics'>Analytics</TabsTrigger>
                  <TabsTrigger value='history'>History</TabsTrigger>
                  <TabsTrigger value='traits'>Traits</TabsTrigger>
                  <TabsTrigger value='profile'>Profile</TabsTrigger>
                </TabsList>

                <AnimatePresence mode='wait'>
                  <TabsContent value='overview'>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className='space-y-4'
                    >
                      {renderOverviewContent()}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value='analytics'>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className='space-y-4'
                    >
                      {renderAnalyticsContent()}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value='history'>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className='space-y-4'
                    >
                      {renderHistoryContent()}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value='traits'>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className='space-y-4'
                    >
                      {renderTraitsContent()}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value='profile'>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className='space-y-4'
                    >
                      {renderProfileContent()}
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>

              {renderSocialMediaLinks().length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Share2 className='size-4' />
                      Social Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='flex flex-wrap gap-2'>
                    {renderSocialMediaLinks()}
                  </CardContent>
                </Card>
              )}
              {renderMarketplaceLinks().length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Link className='size-4' />
                      Marketplace Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='flex flex-wrap gap-2'>
                    {renderMarketplaceLinks()}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
