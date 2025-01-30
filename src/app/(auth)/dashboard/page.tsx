'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '&/components/ui/tabs'
import { Overview } from '&/components/overview'
import { RecentAnalyses } from '&/components/recent-analyses'
import { mockNFTs } from '&/lib/mock-data'
import { NFTGridView } from '&/components/nft-grid-view'
import { UserProfileDialog } from '&/components/user-profile-dialog'
import { EmptyNFTCard } from '&/components/empty-nft-card'
import { useState } from 'react'
import { NFTData } from '&/types'

export default function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState<NFTData | null>(null)

  const handleOpenUserProfile = user => {
    setSelectedUser(user)
    setIsUserProfileOpen(true)
  }

  const handleOpenNFTDetails = (nft: any) => {
    setSelectedNFT(nft)
  }

  return (
    <div className='flex-col md:flex'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight sublime-text'>
            Dashboard
          </h2>
        </div>
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList className='bg-background/80 backdrop-blur-sm'>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='nfts'>NFTs</TabsTrigger>
          </TabsList>
          <TabsContent value='overview' className='space-y-4'>
            <Overview />
            <RecentAnalyses />
          </TabsContent>
          <TabsContent value='nfts'>
            <EmptyNFTCard />
            <NFTGridView
              nfts={mockNFTs}
              onOpenDetails={handleOpenNFTDetails}
              onOpenUserProfile={handleOpenUserProfile}
            />
          </TabsContent>
        </Tabs>
        <UserProfileDialog
          open={isUserProfileOpen}
          onOpenChange={setIsUserProfileOpen}
          userData={selectedUser}
        />
      </div>
    </div>
  )
}
