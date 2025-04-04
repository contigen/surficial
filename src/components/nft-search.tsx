'use client'

import { FormEvent, useState } from 'react'
import { Button } from '&/components/ui/button'
import { Input } from '&/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { Label } from '&/components/ui/label'
import { Spinner } from './ui/spinner'
import {
  getNFTMetadata,
  updateNFTAnalysisAction,
  updateNFTDataAction,
} from '&/actions'
import { EmptyState } from './empty-state'
import { toast } from 'sonner'
import { analysisResultAtom } from '&/lib/atoms'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { getNetworkID, getNetworkName } from '&/lib/utils'
import { Blockchain } from '&/types'
import { useSession } from 'next-auth/react'

export function NFTSearch() {
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const setAnalysisResultAtom = useSetAtom(analysisResultAtom)
  const router = useRouter()
  const { data: session } = useSession()
  const userId = session?.user.id
  const walletId = session?.user.walletId

  async function formAction(evt: FormEvent) {
    evt.preventDefault()
    const formData = new FormData(evt.currentTarget as HTMLFormElement)
    setIsSearching(true)
    const blockchain = formData.get('blockchain')?.toString()
    const address = formData.get('contractAddress')?.toString()
    const tokenID = formData.get('tokenId')?.toString()
    if (!address || !tokenID) {
      toast.warning('Invalid Form Data')
      return
    }
    const nfts = await getNFTMetadata(
      getNetworkID(blockchain as Blockchain),
      address,
      tokenID
    )
    if (!nfts) {
      setError('An error occurred during analysis. Please try again.')
      return
    }

    const _formData = new FormData()
    _formData.set('chain', getNetworkName(nfts.metadata.chain_id))
    _formData.set('token_id', nfts.metadata.token_id)
    _formData.set('address', nfts.metadata.address)
    _formData.set('wallet_id', walletId || '')
    const verified = nfts.metadata.verified

    const analysisFormData = new FormData()
    analysisFormData.set('name', nfts.metadata.name)
    analysisFormData.set('image_url', nfts.metadata.token_image_url)
    analysisFormData.set('collection', nfts.metadata.collection_name)
    analysisFormData.set('user_id', userId || '')
    await Promise.all([
      updateNFTDataAction(_formData, verified),
      updateNFTAnalysisAction(analysisFormData, verified),
    ])

    setIsSearching(false)
    setAnalysisResultAtom({ type: `nft`, data: [nfts] })
    toast.success('Analysis Complete', {
      description: `NFT Search completed successfully.`,
    })
    router.push('/explore')
  }

  if (error) {
    return (
      <EmptyState
        title='NFT Search Error'
        description={error}
        action={{ label: 'Try Again', href: '/analyze' }}
      />
    )
  }

  return (
    <Card className='sublime-hover bg-background/80 backdrop-blur-sm'>
      <CardHeader>
        <CardTitle>Search NFT</CardTitle>
        <CardDescription>
          Enter the NFT token ID and contract address to analyze
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formAction}>
          <fieldset disabled={isSearching} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='blockchain'>NFT Blockchain</Label>
              <Input
                name='blockchain'
                id='blockchain'
                defaultValue='Ethereum'
                placeholder='Enter NFT Blockchain'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='tokenId'>NFT Token ID</Label>
              <Input
                id='tokenId'
                name='tokenId'
                placeholder='Enter NFT token ID'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='contractAddress'>Contract Address</Label>
              <Input
                id='contractAddress'
                name='contractAddress'
                placeholder='Enter contract address'
                required
              />
            </div>
            <Button type='submit' className='w-full'>
              {isSearching ? <Spinner /> : 'Search NFT'}
            </Button>
          </fieldset>
        </form>
      </CardContent>
    </Card>
  )
}
