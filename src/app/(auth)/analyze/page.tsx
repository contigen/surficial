'use client'

import { NFTUploader } from '&/components/nft-uploader'
import { NFTSearch } from '&/components/nft-search'
import { CollectionAnalysis } from '&/components/collection-analysis'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '&/components/ui/tabs'

export default function AnalyzePage() {
  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-4xl font-bold mb-6 sublime-text'>Analyze NFT</h1>
      <Tabs defaultValue='upload' className='space-y-4'>
        <TabsList className='bg-background/80 backdrop-blur-sm'>
          <TabsTrigger value='upload'>Upload Image</TabsTrigger>
          <TabsTrigger value='nft'>NFT Search</TabsTrigger>
          <TabsTrigger value='collection'>Collection Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value='upload'>
          <NFTUploader />
        </TabsContent>
        <TabsContent value='nft'>
          <NFTSearch />
        </TabsContent>
        <TabsContent value='collection'>
          <CollectionAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  )
}
