'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '&/components/ui/dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '&/components/ui/avatar'
import { Badge } from '&/components/ui/badge'
import { Button } from '&/components/ui/button'
import { ScrollArea } from '&/components/ui/scroll-area'
import { UserNFTGrid } from './user-nft-grid'
import { WalletActivity } from './wallet-activity'
import { UserStats } from './user-stats'
import { BlockchainData } from './blockchain-data'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, User, Wallet, BarChart3, History, Share2 } from 'lucide-react'
import { toast } from '&/hooks/use-toast'
import { formatDistanceToNow } from 'date-fns'

type UserProfileDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  userData: {
    address: string
    nfts: any[]
    stats: {
      totalNFTs: number
      totalValue: number
      firstTransaction: string
    }
    [key: string]: any
  } | null
}

export function UserProfileDialog({
  open,
  onOpenChange,
  userData,
}: UserProfileDialogProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const copyAddress = () => {
    if (userData) {
      navigator.clipboard.writeText(userData.address)
      toast({
        title: 'Address copied',
        description: 'Wallet address copied to clipboard',
      })
    }
  }

  if (!userData) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-4xl h-[80vh] p-0'>
        <DialogTitle className='sr-only'>User Profile</DialogTitle>
        <div className='flex overflow-y-hidden'>
          <div className='w-80 border-r bg-muted/50 p-6'>
            <div className='flex flex-col items-center space-y-4'>
              <Avatar className='h-20 w-20'>
                <AvatarImage
                  src={`https://avatar.vercel.sh/${userData.address}`}
                />
                <AvatarFallback>
                  {userData.address.slice(2, 4).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='text-center'>
                <h2 className='text-2xl font-bold'>Wallet Profile</h2>
                <div className='mt-2 flex items-center gap-2'>
                  <Badge
                    variant='outline'
                    className='font-mono'
                    onClick={copyAddress}
                  >
                    {userData.address.slice(0, 6)}...
                    {userData.address.slice(-4)}
                  </Badge>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-6 w-6'
                    onClick={copyAddress}
                  >
                    <Copy className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>

            <div className='mt-8 space-y-4'>
              <Card>
                <CardContent className='p-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <p className='text-sm text-muted-foreground'>
                        Total NFTs
                      </p>
                      <p className='text-2xl font-bold'>
                        {userData.stats.totalNFTs}
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm text-muted-foreground'>
                        Total Value
                      </p>
                      <p className='text-2xl font-bold'>
                        ${userData.stats.totalValue.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className='space-y-2'>
                <Button
                  variant='outline'
                  className='w-full justify-start'
                  onClick={() => setActiveTab('overview')}
                >
                  <User className='mr-2 h-4 w-4' />
                  Overview
                </Button>
                <Button
                  variant='outline'
                  className='w-full justify-start'
                  onClick={() => setActiveTab('nfts')}
                >
                  <Share2 className='mr-2 h-4 w-4' />
                  NFTs
                </Button>
                <Button
                  variant='outline'
                  className='w-full justify-start'
                  onClick={() => setActiveTab('wallet')}
                >
                  <Wallet className='mr-2 h-4 w-4' />
                  Wallet Activity
                </Button>
                <Button
                  variant='outline'
                  className='w-full justify-start'
                  onClick={() => setActiveTab('stats')}
                >
                  <BarChart3 className='mr-2 h-4 w-4' />
                  Statistics
                </Button>
                <Button
                  variant='outline'
                  className='w-full justify-start'
                  onClick={() => setActiveTab('blockchain')}
                >
                  <History className='mr-2 h-4 w-4' />
                  Blockchain Data
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='flex-1'>
            <ScrollArea className='h-full'>
              <div className='p-6'>
                <AnimatePresence mode='wait'>
                  {activeTab === 'overview' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className='space-y-6'
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>Portfolio Overview</CardTitle>
                          <CardDescription>
                            Your NFT portfolio at a glance
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                            <Card>
                              <CardHeader className='pb-2'>
                                <CardTitle className='text-sm font-medium'>
                                  Total Value
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className='text-2xl font-bold'>
                                  ${userData.stats.totalValue.toFixed(2)}
                                </div>
                                <p className='text-xs text-muted-foreground'>
                                  Across {userData.stats.totalNFTs} NFTs
                                </p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader className='pb-2'>
                                <CardTitle className='text-sm font-medium'>
                                  Active Since
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className='text-2xl font-bold'>
                                  {formatDistanceToNow(
                                    new Date(userData.stats.firstTransaction),
                                    { addSuffix: true }
                                  )}
                                </div>
                                <p className='text-xs text-muted-foreground'>
                                  First transaction date
                                </p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader className='pb-2'>
                                <CardTitle className='text-sm font-medium'>
                                  Total Transactions
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className='text-2xl font-bold'>
                                  {userData.nfts.reduce(
                                    (sum, nft) =>
                                      sum + nft.analytics.transactions,
                                    0
                                  )}
                                </div>
                                <p className='text-xs text-muted-foreground'>
                                  Across all NFTs
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Recent NFTs</CardTitle>
                          <CardDescription>
                            Your most recent NFT acquisitions
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <UserNFTGrid
                            nfts={userData.nfts.slice(0, 3)}
                            minimal
                            key='overview-nfts'
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {activeTab === 'nfts' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <UserNFTGrid nfts={userData.nfts} key='all-nfts' />
                    </motion.div>
                  )}

                  {activeTab === 'wallet' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <WalletActivity userData={userData} />
                    </motion.div>
                  )}

                  {activeTab === 'stats' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <UserStats userData={userData} />
                    </motion.div>
                  )}

                  {activeTab === 'blockchain' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <BlockchainData userData={userData} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
