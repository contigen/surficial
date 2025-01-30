'use client'

import { useState } from 'react'
import { NaturalLanguageSearch } from '&/components/natural-language-search'
import { NFTTopDealItem } from '&/types'
import { NFTSearchCard } from './nft-search-card'

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<NFTTopDealItem>([])
  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-4xl font-bold mb-6 sublime-text'>
        Search & Compare NFTs
      </h1>

      <div className='mb-6'>
        <NaturalLanguageSearch {...{ setSearchResults }} />
      </div>

      {searchResults.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {searchResults.map(nft => (
            <NFTSearchCard
              key={`${nft.contract_address}-${nft.token_id}`}
              {...nft}
            />
          ))}
        </div>
      )}
    </div>
  )
}
