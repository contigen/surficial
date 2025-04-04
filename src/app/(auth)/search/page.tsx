'use client'

import { useState } from 'react'
import { NaturalLanguageSearch } from '&/components/natural-language-search'
import { NFTTopDealItem } from '&/types'
import { NFTSearchCard } from './nft-search-card'

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<NFTTopDealItem>([])
  return (
    <div className='container py-10 mx-auto'>
      <h1 className='mb-6 text-4xl font-bold sublime-text'>
        Search & Compare NFTs
      </h1>

      <div className='mb-6'>
        <NaturalLanguageSearch {...{ setSearchResults }} />
      </div>

      {searchResults.length > 0 && (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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
