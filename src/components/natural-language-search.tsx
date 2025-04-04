'use client'

import { useState, useEffect, Dispatch, SetStateAction, FormEvent } from 'react'
import { Input } from '&/components/ui/input'
import { Button } from '&/components/ui/button'
import { Mic, MicOff, Search } from 'lucide-react'
import { useCombobox } from 'downshift'
import { Card, CardContent } from '&/components/ui/card'
import { useSpeechRecognition } from '&/hooks/speech-recognition/use-speech-recognition'
import { toast } from 'sonner'
import { processNFTQueryWithEmbeddings } from '&/actions'
import { Spinner } from './ui/spinner'
import { NFTTopDealItem } from '&/types'

const suggestions = [
  'Space-themed NFTs',
  'Bored Ape Yacht Club',
  'NFTs with a yellow theme',
  'NFTs under 5ETH',
  'Highly priced NFTs',
  'NFTs with a red background',
]

type NaturalLanguageSearchProps = {
  setSearchResults: Dispatch<SetStateAction<NFTTopDealItem>>
}

export function NaturalLanguageSearch({
  setSearchResults,
}: NaturalLanguageSearchProps) {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState(suggestions)
  const [isListening, setIsListening] = useState(false)
  const [pending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  const {
    Recognition,
    startSpeechRec,
    stopSpeechRec,
    transcript: { preview, note },
  } = useSpeechRecognition()
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
    selectedItem,
    setInputValue: setComboboxInputValue,
  } = useCombobox({
    items,
    onInputValueChange: ({ inputValue }) => {
      setError(false)
      setInputValue(inputValue || '')
      setComboboxInputValue(inputValue || '')
      setItems(
        suggestions.filter(item =>
          item.toLowerCase().includes(inputValue?.toLowerCase() || '')
        )
      )
    },
  })

  function handleSpeechRec() {
    if (!Recognition) {
      toast.info(`Speech Recognition Unavailable`, {
        description: `Your browser doesn't support speech recognition. Please try using a different browser or input your message manually.`,
      })
      return
    }
    setIsListening(prev => !prev)
    if (isListening) {
      stopSpeechRec()
    } else {
      startSpeechRec()
    }
  }

  const handleSearch = async (evt: FormEvent) => {
    evt.preventDefault()
    const formData = new FormData()
    formData.set('prompt', inputValue)
    setIsPending(true)
    const nftdata = await processNFTQueryWithEmbeddings({}, formData)
    if (!nftdata) {
      setError(true)
      return
    }
    setIsPending(false)
    setSearchResults(nftdata as NFTTopDealItem)
  }

  useEffect(() => {
    console.log('Speech Preview:', preview)
    setInputValue(note || preview || '')
    setComboboxInputValue(note || preview || '')
  }, [note, preview])

  return (
    <div className='relative w-full max-w-2xl mx-auto mb-20'>
      <form className='flex items-center' onSubmit={handleSearch}>
        <Input
          {...getInputProps()}
          placeholder='Search for NFTs, collections, or traits...'
          required
          className='pr-20 shadow-lg'
          disabled={pending}
        />
        <div className='absolute right-0 flex items-center space-x-2'>
          <Button
            size='icon'
            variant='ghost'
            onClick={handleSpeechRec}
            className={isListening ? 'text-primary' : ''}
          >
            {isListening ? (
              <Mic className='h-4 w-4' />
            ) : (
              <MicOff className='h-4 w-4' />
            )}
          </Button>
          <Button size='icon' type='submit'>
            {pending ? (
              <Spinner strokeColor='#fff' />
            ) : (
              <Search className='h-4 w-4' />
            )}
          </Button>
        </div>
      </form>
      {error && (
        <h3 className='ml-16 font-semibold text-xl tracking-tight my-8'>
          No related NFT data found. Try again with another input.
        </h3>
      )}
      <Card
        {...getMenuProps()}
        className={`absolute z-10 w-full mt-4 shadow-2xl backdrop-blur-2xl bg-card/50 ${
          isOpen ? '' : 'hidden'
        }`}
      >
        <CardContent className='p-0 rounded-lg overflow-hidden'>
          {isOpen &&
            items.map((item, index) => (
              <div
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
                className={`px-4 py-2 cursor-pointer ${
                  highlightedIndex === index ? 'bg-accent' : ''
                } ${selectedItem === item ? 'font-bold' : ''}`}
              >
                {item}
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
