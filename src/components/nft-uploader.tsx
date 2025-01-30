import { useState, ChangeEvent, useRef, DragEvent } from 'react'
import { Button } from '&/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { Upload, X, Clipboard } from 'lucide-react'
import Image from 'next/image'
import { Spinner } from './ui/spinner'
import { getSimilarImage, updateNFTDataAction } from '&/actions'
import { useToast } from '&/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useSetAtom } from 'jotai'
import { analysisResultAtom, dataImageAtom } from '&/lib/atoms'
import { EmptyState } from './empty-state'
import { useSession } from 'next-auth/react'
import { getNetworkName } from '&/lib/utils'

export function NFTUploader() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const setDataImageAtom = useSetAtom(dataImageAtom)
  const setAnalysisResultAtom = useSetAtom(analysisResultAtom)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()
  const { data: session } = useSession()
  const walletId = session?.user.walletId

  function readFile(file: File | undefined) {
    if (file && file.type.startsWith(`image/`)) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) setPreviewUrl(reader.result.toString())
      }
      reader.readAsDataURL(file)
      setFile(file)
    } else {
      toast({
        title: `Invalid File Type`,
        description: `Please upload a valid image file.`,
        variant: `destructive`,
      })
    }
  }

  function handleFileUpload(evt: ChangeEvent<HTMLInputElement>) {
    setIsAnalyzing(false)
    const file = evt.target.files?.[0]
    readFile(file)
  }

  function handleDrop(evt: DragEvent<HTMLDivElement>) {
    evt.preventDefault()
    setIsDragging(false)
    const file = evt.dataTransfer.files?.[0]
    if (file) {
      readFile(file)
    } else {
      toast({
        title: `No file detected`,
        description: `Please drop a valid image file.`,
        variant: `destructive`,
      })
    }
  }

  function handleDragOver(evt: DragEvent<HTMLDivElement>) {
    evt.preventDefault()
    evt.dataTransfer.dropEffect = `copy`
    setIsDragging(true)
  }

  function handleDragEnter(evt: DragEvent<HTMLDivElement>) {
    evt.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(evt: DragEvent<HTMLDivElement>) {
    evt.preventDefault()
    setIsDragging(false)
  }

  async function handlePaste() {
    try {
      if (!navigator.clipboard.read) {
        toast({
          title: `Clipboard API not supported`,
          description: `Your browser doesn't support pasting images. Try dragging and dropping or uploading an image instead.`,
          variant: `destructive`,
        })
        return
      }
      const clipboardItems = await navigator.clipboard.read()
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type.startsWith(`image/`)) {
            const blob = await clipboardItem.getType(type)
            const file = new File([blob], `pasted-image`, { type: blob.type })
            readFile(file)
            return
          }
        }
      }
      toast({
        title: `No image found`,
        description: `There's no image in your clipboard. Try copying an image first.`,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: `Clipboard access error`,
        description: `Could not access your clipboard. Ensure permissions are granted and try again.`,
        variant: `destructive`,
      })
    }
  }

  async function handleAnalyze() {
    setIsAnalyzing(true)
    const formData = new FormData()
    formData.set(`image`, file as Blob)
    const nfts = await getSimilarImage(formData)
    setIsAnalyzing(false)
    if (!nfts) {
      setError('An error occurred during analysis. Please try again.')
      return
    }

    const _formData = new FormData()
    _formData.set('chain', getNetworkName(nfts[0].metadata.chain_id))
    _formData.set('token_id', nfts[0].metadata.token_id)
    _formData.set('address', nfts[0].metadata.address)
    _formData.set('wallet_id', walletId || '')
    const verified = nfts[0].metadata.verified

    await updateNFTDataAction(_formData, verified)

    setDataImageAtom(previewUrl)
    setAnalysisResultAtom({ type: `nft`, data: nfts })
    toast({
      title: 'Analysis Complete',
      description: `NFT analysis completed successfully.`,
    })
    router.push('/explore')
  }

  if (error) {
    return (
      <EmptyState
        title='Analysis Error'
        description={error}
        action={{ label: 'Try Again', href: '/analyze' }}
      />
    )
  }

  return (
    <Card className='sublime-hover bg-background/80 backdrop-blur-sm'>
      <CardHeader>
        <CardTitle>NFT Analysis</CardTitle>
        <CardDescription>Upload an NFT image to begin analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed border-border rounded-lg p-12 text-center transition-all hover:border-primary mb-4 ${
            isDragging ? 'border-dotted border-primary' : ''
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept='image/*'
            className='hidden'
          />
          {previewUrl ? (
            <div className='flex flex-col items-center'>
              <Button
                variant='ghost'
                onClick={evt => {
                  evt.stopPropagation()
                  setPreviewUrl(null)
                }}
                className='rounded-xl'
              >
                <X className='w-4 h-4' />
              </Button>
              <p className='mb-2 font-bold'>Image Preview:</p>
              <Image
                src={previewUrl}
                alt='NFT Preview'
                width={80}
                height={80}
                className='max-w-full mx-auto rounded-lg shadow-md w-28 h-28 object-cover'
              />
            </div>
          ) : (
            <div>
              <Upload className='mx-auto h-12 w-12 text-muted-foreground' />
              <p className='text-muted-foreground mt-2'>
                Drag & drop your NFT image here, or click to select
              </p>
              <p className='text-muted-foreground text-sm mt-1 mb-3'>
                You can also paste an image from your clipboard
              </p>
              <Button
                type='button'
                onClick={evt => {
                  evt.stopPropagation()
                  handlePaste()
                }}
              >
                <Clipboard className='mr-2 h-4 w-4' /> Paste Image
              </Button>
            </div>
          )}
        </div>
        <Button
          className='w-full'
          type='submit'
          onClick={handleAnalyze}
          disabled={!previewUrl || isAnalyzing}
        >
          {isAnalyzing ? Spinner : `Start Analysis`}
        </Button>
      </CardContent>
    </Card>
  )
}
