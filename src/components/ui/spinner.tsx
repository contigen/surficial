'use client'

import { RotatingLines } from 'react-loader-spinner'

export function Spinner({ strokeColor }: { strokeColor?: string }) {
  return (
    <RotatingLines
      strokeColor={strokeColor || '#fff'}
      strokeWidth='4'
      width='24'
    />
  )
}
