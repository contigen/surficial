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
import { toast } from '&/hooks/use-toast'
import { Spinner } from './ui/spinner'
import { useRouter } from 'next/navigation'
import { useSetAtom } from 'jotai'
import { analysisResultAtom } from '&/lib/atoms'
import { EmptyState } from './empty-state'
import {
  getComputedNFTCollectionMetadata,
  updateNFTCollectionDataAction,
} from '&/actions'
import { Blockchain } from '&/types'
import { useSession } from 'next-auth/react'

export function CollectionAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const setAnalysisResultAtom = useSetAtom(analysisResultAtom)
  const router = useRouter()
  const { data: session } = useSession()
  const walletId = session?.user.walletId

  async function formAction(evt: FormEvent) {
    evt.preventDefault()
    const formData = new FormData(evt.currentTarget as HTMLFormElement)
    setIsAnalyzing(true)
    const blockchain = formData
      .get('blockchain')
      ?.toString()
      .toLowerCase() as Blockchain
    const address = formData.get('collection')?.toString()
    if (!address || !blockchain) {
      toast({
        title: 'Invalid Form Data',
        variant: 'destructive',
      })
      return
    }
    const collections = await getComputedNFTCollectionMetadata(
      blockchain,
      address
    )
    if (!(collections.metadata.length > 0)) {
      setError('Unknown NFT Collection Metadata')
      return
    }

    const _formData = new FormData()
    _formData.set('name', collections.metadata[0].collection)
    _formData.set('address', collections.metadata[0].contract_address)
    _formData.set('wallet_id', walletId || '')

    await updateNFTCollectionDataAction(_formData)
    setIsAnalyzing(false)
    setAnalysisResultAtom({ type: `collection`, data: [collections] })
    toast({
      title: 'Analysis Complete',
      description: `NFT Collection analysis completed successfully.`,
    })
    router.push('/explore')
  }

  if (error) {
    return (
      <EmptyState
        title='NFT Collection Analysis Error'
        description={error}
        action={{ label: 'Try Again', href: '/analyze' }}
      />
    )
  }

  return (
    <Card className='sublime-hover bg-background/80 backdrop-blur-sm'>
      <CardHeader>
        <CardTitle>Analyze Collection</CardTitle>
        <CardDescription>
          Enter the collection ID to analyze the entire NFT collection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formAction}>
          <fieldset disabled={isAnalyzing} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='blockchain'>NFT Collection Blockchain</Label>
              <Input
                name='blockchain'
                id='blockchain'
                defaultValue='Ethereum'
                placeholder='Enter Collection Blockchain'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='collection'>Collection Contract Address</Label>
              <Input
                id='collection'
                name='collection'
                placeholder='Enter Collection Address'
                required
              />
            </div>
            <Button type='submit' className='w-full'>
              {isAnalyzing ? Spinner : 'Analyze Collection'}
            </Button>
          </fieldset>
        </form>
      </CardContent>
    </Card>
  )
}
