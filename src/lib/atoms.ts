import { NFTCollectionData, NFTData } from '&/types'
import { atom } from 'jotai'

type NFTAnalysis = {
  type: 'nft'
  data: NFTData[]
}

type NFTCollectionAnalysis = {
  type: 'collection'
  data: NFTCollectionData[]
}

type Analysis = NFTAnalysis | NFTCollectionAnalysis

export const analysisResultAtom = atom<Analysis | null>(null)

export const dataImageAtom = atom<string | null>(null)
