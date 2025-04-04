import { useState, useRef, ChangeEvent, DragEvent } from 'react'
import { toast } from './use-toast'

export function useFileUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  function readFile(file: File | undefined) {
    if (file && file.type.startsWith(`image/`)) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) setPreviewUrl(reader.result.toString())
      }
      reader.readAsDataURL(file)
    } else {
      toast({
        title: `Invalid File Type`,
        description: `Please upload a valid image file.`,
        variant: `destructive`,
      })
    }
  }

  function handleFileUpload(evt: ChangeEvent<HTMLInputElement>) {
    const file = evt.target.files?.[0]
    readFile(file)
  }

  function handleDragOver(evt: DragEvent<HTMLDivElement>) {
    evt.preventDefault()
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

  function handleDrop(evt: DragEvent<HTMLDivElement>) {
    evt.preventDefault()
    setIsDragging(false)
    const file = evt.dataTransfer.files[0]
    readFile(file)
  }

  async function handlePaste() {
    try {
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
        description: `There's no image in your clipboard. Try copying an image first or use the file upload.`,
      })
    } catch {
      toast({
        title: `Clipboard access denied`,
        description: `Please allow clipboard access and try again.`,
      })
    }
  }

  return {
    previewUrl,
    setPreviewUrl,
    isDragging,
    fileInputRef,
    handleFileUpload,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handlePaste,
  }
}
