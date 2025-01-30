'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '&/components/ui/tabs'
import { Overview } from '&/components/overview'
import { RecentAnalyses } from '&/components/recent-analyses'
import { mockNFTs } from '&/lib/mock-data'
import { NFTGridView } from '&/components/nft-grid-view'
import { UserProfileDialog } from '&/components/user-profile-dialog'
import { EmptyNFTCard } from '&/components/empty-nft-card'
import { use, useState } from 'react'
import { NFTData } from '&/types'

export function DashboardView({
  nftStats,
  nftAnalysis,
}: {
  nftStats: Promise<[number, number, number, number] | null>
  nftAnalysis: Promise<
    | {
        id: string
        collection: string
        status: 'UNVERIFIED' | 'VERIFIED' | 'SUSPICIOUS'
        name: string
        imageURL: string
      }[]
    | null
  >
}) {
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

  const resolvedNFTStats = use(nftStats)
  const resolvedNFTAnalysis = use(nftAnalysis)
  return (
    <>
      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList className='bg-background/80 backdrop-blur-sm'>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='nfts'>NFTs</TabsTrigger>
        </TabsList>
        <TabsContent value='overview' className='space-y-4'>
          <Overview
            totalNFTs={resolvedNFTStats?.[0] || 0}
            verifiedNFTs={resolvedNFTStats?.[1] || 0}
            suspiciousNFTs={resolvedNFTStats?.[1] || 0}
            collectionsAmount={resolvedNFTStats?.[3] || 0}
          />
          <RecentAnalyses nftAnalysis={resolvedNFTAnalysis} />
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
    </>
  )
}
