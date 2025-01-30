'use client'

import { Fragment, useState } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '&/components/ui/drawer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '&/components/ui/tabs'
import { Badge } from '&/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
import { ScrollArea } from '&/components/ui/scroll-area'
import { formatDistanceToNow } from 'date-fns'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import {
  BarChart3,
  ExternalLink,
  Info,
  Share2,
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  Link,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NFTCollectionData } from '&/types'
import { parseCloseColours } from '&/lib/utils'

interface CollectionDetailSheetProps {
  collection: NFTCollectionData | null
  onClose: () => void
}

export function CollectionDetailSheet({
  collection,
  onClose,
}: CollectionDetailSheetProps) {
  const [activeTab, setActiveTab] = useState('overview')

  if (!collection) return null

  const {
    metadata,
    analytics,
    profile,
    scores,
    traders,
    whales,
    washtrade,
    holders,
  } = collection

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
    return metadata?.flatMap((meta, index) => {
      const socialLinks = [
        { platform: 'Discord', url: meta.discord_url },
        { platform: 'Twitter', url: meta.twitter_url },
        { platform: 'Instagram', url: meta.instagram_url },
        { platform: 'Medium', url: meta.medium_url },
        { platform: 'Telegram', url: meta.telegram_url },
      ]
      return socialLinks
        .filter(social => social.url)
        .map(social => (
          <a
            key={`${social.platform}-${index}`}
            href={social.url || ''}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Badge variant='outline' className='flex items-center gap-1'>
              {social.platform} {metadata?.length > 1 ? `(${index + 1})` : ''}
              <ExternalLink className='h-3 w-3' />
            </Badge>
          </a>
        ))
    })
  }

  const renderMarketplaceLinks = () => {
    const marketplaceLinks = metadata?.flatMap(meta => {
      const { contract_address, collection } = meta
      const collection_name = collection.toLowerCase().replace(/\s+/g, '')
      return [
        {
          name: 'opensea',
          url: `https://opensea.io/collection/${collection_name}`,
        },

        {
          name: 'blur',
          url: `https://blur.io/collection/${collection_name}`,
        },

        {
          name: 'looksrare',
          url: `https://looksrare.org/collections/${contract_address}`,
        },
      ]
    })
    return marketplaceLinks.map((link, idx) => (
      <a
        key={`${link.name}-${idx}`}
        href={link.url}
        target='_blank'
        rel='noopener noreferrer'
      >
        <Badge variant='secondary' className='flex items-center gap-1'>
          {link.name}
          <ExternalLink className='size-3' />
        </Badge>
      </a>
    ))
  }

  const renderOverviewContent = () => {
    return (
      <>
        {metadata?.map((meta, idx) => {
          const contractCreatedDate = () => {
            try {
              return formatDistanceToNow(new Date(meta.contract_created_date), {
                addSuffix: true,
              })
            } catch {
              return meta.contract_created_date
            }
          }
          return (
            <Fragment key={idx}>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Info className='h-4 w-4' />
                    Collection Information{' '}
                    {metadata.length > 1
                      ? `(${idx + 1}/${metadata.length})`
                      : ''}
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground'>
                      Blockchain
                    </span>
                    <Badge>{meta.blockchain}</Badge>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground'>
                      Contract Type
                    </span>
                    <Badge variant='outline'>{meta.contract_type}</Badge>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground'>
                      Category
                    </span>
                    <Badge variant='secondary'>{meta.category || 'N/A'}</Badge>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground'>
                      Contract Created
                    </span>
                    <Badge variant='outline'>{contractCreatedDate()}</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Info className='h-4 w-4' />
                    Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='whitespace-pre-line text-sm text-muted-foreground'>
                    {meta.description}
                  </p>
                </CardContent>
              </Card>
            </Fragment>
          )
        })}

        {analytics?.map((analytic, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <BarChart3 className='h-4 w-4' />
                Collection Analytics{' '}
                {analytics.length > 1
                  ? `(${index + 1}/${analytics.length})`
                  : ''}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Total Assets
                </span>
                <Badge variant='secondary'>
                  {analytic.assets.toLocaleString()}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Total Sales
                </span>
                <Badge variant='secondary'>
                  {analytic.sales.toLocaleString()}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Total Volume
                </span>
                <Badge variant='secondary'>
                  ${analytic.volume.toLocaleString()}
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
            </CardContent>
          </Card>
        ))}

        {profile?.map((prof, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Shield className='h-4 w-4' />
                Collection Profile{' '}
                {profile.length > 1 ? `(${index + 1}/${profile.length})` : ''}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Collection Score
                </span>
                <Badge variant='secondary'>
                  {prof.collection_score.toFixed(2)}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Fear and Greed Index
                </span>
                <Badge variant='secondary'>
                  {prof.fear_and_greed_index.toFixed(2)}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Wash Trade Index
                </span>
                <Badge variant='secondary'>
                  {prof.washtrade_index.toFixed(4)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </>
    )
  }

  const renderAnalyticsContent = () => {
    return analytics?.map((analytic, index) => {
      const volumeData = JSON.parse(analytic.volume_trend).map(
        (volume: number, i: number) => ({
          date: analytic.block_dates[i],
          volume,
        })
      )

      return (
        <Card key={index}>
          <CardHeader>
            <CardTitle>
              Volume Trend{' '}
              {analytics.length > 1 ? `(${index + 1}/${analytics.length})` : ''}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={volumeData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <RechartsTooltip />
                <Line type='monotone' dataKey='volume' stroke='#8884d8' />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )
    })
  }

  const renderHoldersContent = () => {
    return holders?.map((holder, index) => {
      const holderData = [
        { name: '1 Token', value: Number.parseInt(holder.holders_tokens_1) },
        { name: '2 Tokens', value: Number.parseInt(holder.holders_tokens_2) },
        {
          name: '3-5 Tokens',
          value: Number.parseInt(holder.holders_tokens_3_5),
        },
        {
          name: '6-9 Tokens',
          value: Number.parseInt(holder.holders_tokens_6_9),
        },
        {
          name: '10-15 Tokens',
          value: Number.parseInt(holder.holders_tokens_10_15),
        },
        {
          name: '16-25 Tokens',
          value: Number.parseInt(holder.holders_tokens_16_25),
        },
        {
          name: '25+ Tokens',
          value: Number.parseInt(holder.holders_tokens_25plus),
        },
      ]

      return (
        <Card key={index}>
          <CardHeader>
            <CardTitle>
              Holder Distribution{' '}
              {holders.length > 1 ? `(${index + 1}/${holders.length})` : ''}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={holderData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey='value' fill='#8884d8' />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )
    })
  }

  const renderScoresContent = () => {
    return scores?.map((score, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle>
            Collection Scores{' '}
            {scores.length > 1 ? `(${index + 1}/${scores.length})` : ''}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>Market Cap</span>
            <Badge variant='secondary'>
              ${Number.parseInt(score.market_cap).toLocaleString()}
            </Badge>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>
              Market Cap Change
            </span>
            <Badge variant='outline'>
              {formatChange(Number.parseFloat(score.marketcap_change))}
            </Badge>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>
              Minting Revenue
            </span>
            <Badge variant='secondary'>
              ${score.minting_revenue.toLocaleString()}
            </Badge>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>Average Price</span>
            <Badge variant='secondary'>${score.price_avg}</Badge>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>Price Ceiling</span>
            <Badge variant='secondary'>
              ${score.price_ceiling.toLocaleString()}
            </Badge>
          </div>
        </CardContent>
      </Card>
    ))
  }

  const renderTradersContent = () => {
    return traders?.map((trader, index) => {
      return (
        <>
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                Trader Metrics{' '}
                {traders.length > 1 ? `(${index + 1}/${traders.length})` : ''}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Total Traders
                </span>
                <Badge variant='secondary'>
                  {trader.traders.toLocaleString()}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Traders Change
                </span>
                <Badge variant='outline'>
                  {formatChange(trader.traders_change)}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Unique Buyers
                </span>
                <Badge variant='secondary'>
                  {trader.traders_buyers.toLocaleString()}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Unique Sellers
                </span>
                <Badge variant='secondary'>
                  {trader.traders_sellers.toLocaleString()}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Trader Ratio
                </span>
                <Badge variant='secondary'>
                  {trader.traders_ratio.toFixed(2)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card key={`trend-${index}`}>
            <CardHeader>
              <CardTitle>
                Trader Trends{' '}
                {traders.length > 1 ? `(${index + 1}/${traders.length})` : ''}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line
                    type='monotone'
                    data={JSON.parse(trader.traders_buyers_trend).map(
                      (value: number, i: number) => ({
                        date: trader.block_dates[i],
                        value,
                      })
                    )}
                    name='Buyers'
                  />
                  <Line
                    type='monotone'
                    data={JSON.parse(trader.traders_sellers_trend).map(
                      (value: number, i: number) => ({
                        date: trader.block_dates[i],
                        value,
                      })
                    )}
                    name='Sellers'
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )
    })
  }

  const renderWhalesContent = () => {
    return whales?.map((whale, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle>
            Whale Activity{' '}
            {whales.length > 1 ? `(${index + 1}/${whales.length})` : ''}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>Whale Holders</span>
            <Badge variant='secondary'>{whale.whale_holders}</Badge>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>Buy Whales</span>
            <Badge variant='secondary'>{whale.buy_whales}</Badge>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>Sell Whales</span>
            <Badge variant='secondary'>{whale.sell_whales}</Badge>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>Mint Whales</span>
            <Badge variant='secondary'>{whale.mint_whales}</Badge>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>
              Total Sale Volume
            </span>
            <Badge variant='secondary'>
              ${Number.parseInt(whale.total_sale_volume).toLocaleString()}
            </Badge>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>
              Total Mint Volume
            </span>
            <Badge variant='secondary'>
              ${Number.parseInt(whale.total_mint_volume).toLocaleString()}
            </Badge>
          </div>
        </CardContent>
      </Card>
    ))
  }

  const renderWashtradeContent = () => {
    return washtrade?.map((wash, index) => {
      return (
        <>
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                Wash Trade Metrics{' '}
                {washtrade.length > 1
                  ? `(${index + 1}/${washtrade.length})`
                  : ''}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Wash Traded Assets
                </span>
                <Badge variant='secondary'>
                  {wash.washtrade_assets.toLocaleString()}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Suspect Sales
                </span>
                <Badge variant='secondary'>
                  {wash.washtrade_suspect_sales.toLocaleString()}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Wash Trade Volume
                </span>
                <Badge variant='secondary'>
                  ${wash.washtrade_volume.toLocaleString()}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Wash Trade Wallets
                </span>
                <Badge variant='secondary'>
                  {wash.washtrade_wallets.toLocaleString()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card key={`trend-${index}`}>
            <CardHeader>
              <CardTitle>
                Wash Trade Trends{' '}
                {washtrade.length > 1
                  ? `(${index + 1}/${washtrade.length})`
                  : ''}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line
                    type='monotone'
                    data={JSON.parse(wash.washtrade_assets_trend).map(
                      (value: number, i: number) => ({
                        date: wash.block_dates[i],
                        value,
                      })
                    )}
                    name='Assets'
                  />
                  <Line
                    type='monotone'
                    data={JSON.parse(wash.washtrade_suspect_sales_trend).map(
                      (value: number, i: number) => ({
                        date: wash.block_dates[i],
                        value,
                      })
                    )}
                    name='Suspect Sales'
                  />
                  <Line
                    type='monotone'
                    data={JSON.parse(wash.washtrade_volume_trend).map(
                      (value: number, i: number) => ({
                        date: wash.block_dates[i],
                        value,
                      })
                    )}
                    name='Volume'
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )
    })
  }

  return (
    <Drawer open={!!collection} onOpenChange={onClose}>
      <DrawerContent className='overflow-hidden p-0'>
        <ScrollArea className='overflow-y-auto'>
          <div className='flex flex-col h-full'>
            <div className='relative h-64'>
              {metadata?.map((meta, idx) => {
                const colors = parseCloseColours(meta.close_colours)
                return (
                  <div className='relative w-full h-full' key={idx}>
                    <motion.img
                      src={meta.banner_image_url || '/placeholder.svg'}
                      alt={`${meta.collection} Banner`}
                      className='object-cover w-full h-full'
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.2 }}
                    />
                    <motion.div
                      className='rounded-2xl p-2 absolute bottom-4 right-4 backdrop-blur-3xl'
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${colors.join(
                          ', '
                        )})`,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <img
                        src={meta.image_url || '/placeholder.svg'}
                        alt={`${meta.collection} Logo (${idx + 1}/${
                          metadata.length
                        })`}
                        className='size-16 rounded-xl border-2 border-white shadow-lg'
                      />
                    </motion.div>
                  </div>
                )
              })}
            </div>

            <div className='p-6 space-y-6'>
              <DrawerHeader>
                <DrawerTitle className='text-3xl font-bold'>
                  {metadata?.map((meta, index) => (
                    <span key={index}>
                      {meta.collection}
                      {metadata.length > 1 && index < metadata.length - 1
                        ? ' / '
                        : ''}
                    </span>
                  ))}
                </DrawerTitle>

                <p className='text-lg text-muted-foreground'>
                  {metadata?.map((meta, index) => (
                    <span key={index}>
                      {meta.brand}
                      {metadata.length > 1 && index < metadata.length - 1
                        ? ' / '
                        : ''}
                    </span>
                  ))}
                </p>
              </DrawerHeader>

              <Tabs
                defaultValue='overview'
                className='w-full'
                onValueChange={setActiveTab}
              >
                <TabsList className='grid w-full grid-cols-4'>
                  <TabsTrigger value='overview'>Overview</TabsTrigger>
                  <TabsTrigger value='analytics'>Analytics</TabsTrigger>
                  <TabsTrigger value='holders'>Holders</TabsTrigger>
                  <TabsTrigger value='scores'>Scores</TabsTrigger>
                </TabsList>
                <TabsList className='grid w-full grid-cols-3 mt-2'>
                  <TabsTrigger value='traders'>Traders</TabsTrigger>
                  <TabsTrigger value='whales'>Whales</TabsTrigger>
                  <TabsTrigger value='washtrade'>Wash Trade</TabsTrigger>
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

                  <TabsContent value='holders'>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className='space-y-4'
                    >
                      {renderHoldersContent()}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value='scores'>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className='space-y-4'
                    >
                      {renderScoresContent()}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value='traders'>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className='space-y-4'
                    >
                      {renderTradersContent()}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value='whales'>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className='space-y-4'
                    >
                      {renderWhalesContent()}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value='washtrade'>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className='space-y-4'
                    >
                      {renderWashtradeContent()}
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
