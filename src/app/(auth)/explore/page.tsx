'use client'

import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { NFTGridView } from '&/components/nft-grid-view'
import { CollectionGridView } from '&/components/collection-grid-view'
import { NFTDetailSheet } from '&/components/nft-detail-sheet'
import { CollectionDetailSheet } from '&/components/collection-detail-sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '&/components/ui/tabs'
import { analysisResultAtom, dataImageAtom } from '&/lib/atoms'
import { UserProfileDialog } from '&/components/user-profile-dialog'
import { NFTCollectionData, NFTData } from '&/types'
import { EmptyState } from '&/components/empty-state'
import { useSession } from 'next-auth/react'

export default function Page() {
  const [selectedNFT, setSelectedNFT] = useState<NFTData | null>(null)
  const [selectedCollection, setSelectedCollection] =
    useState<NFTCollectionData | null>(null)
  const [activeTab, setActiveTab] = useState('nfts')
  const analysisResult = useAtomValue(analysisResultAtom)
  const dataImage = useAtomValue(dataImageAtom)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (analysisResult) {
      setActiveTab(analysisResult.type === 'nft' ? 'nfts' : 'collections')
    }
  }, [analysisResult])

  const nftsToDisplay =
    analysisResult?.type === 'nft' ? analysisResult.data : []
  const collectionsToDisplay =
    analysisResult?.type === 'collection' ? analysisResult.data : []

  const handleOpenNFTDetails = (nft: any) => {
    setSelectedNFT(nft)
  }

  const handleOpenCollectionDetails = (collection: any) => {
    setSelectedCollection(collection)
  }

  const handleOpenUserProfile = (user: any) => {
    setSelectedUser(user)
  }

  return (
    <main className='container mx-auto px-4 py-8 relative'>
      <h1 className='text-3xl font-bold mb-8'>Explore NFTs and Collections</h1>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='space-y-4'
      >
        <TabsList>
          <TabsTrigger value='nfts'>NFTs</TabsTrigger>
          <TabsTrigger value='collections'>Collections</TabsTrigger>
        </TabsList>
        <TabsContent value='nfts'>
          {nftsToDisplay.length > 0 ? (
            <NFTGridView
              nfts={nftsToDisplay}
              onOpenDetails={handleOpenNFTDetails}
              onOpenUserProfile={handleOpenUserProfile}
              uploadedMedia={dataImage || ''}
            />
          ) : (
            <EmptyState
              title='No NFTs Found'
              description='It looks like there are no NFTs to display at the moment. Try analyzing an NFT.'
              action={{ label: 'Analyze NFT', href: '/analyze' }}
            />
          )}
        </TabsContent>
        <TabsContent value='collections'>
          {collectionsToDisplay.length > 0 ? (
            <CollectionGridView
              collections={collectionsToDisplay}
              onOpenDetails={handleOpenCollectionDetails}
            />
          ) : (
            <EmptyState
              title='No Collections Found'
              description='It seems there are no collections to display right now. Try analyzing a collection.'
              action={{ label: 'Analyze Collection', href: '/analyze' }}
            />
          )}
        </TabsContent>
      </Tabs>

      {selectedNFT && (
        <NFTDetailSheet
          data={selectedNFT}
          onClose={() => setSelectedNFT(null)}
          isUploaded={!!dataImage}
        />
      )}
      {selectedCollection && (
        <CollectionDetailSheet
          collection={selectedCollection}
          onClose={() => setSelectedCollection(null)}
        />
      )}
      <UserProfileDialog
        open={!!selectedUser}
        onOpenChange={open => !open && setSelectedUser(null)}
        userData={selectedUser}
      />
    </main>
  )
}
