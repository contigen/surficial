import Link from 'next/link'
import { ModeToggle } from './mode-toggle'

export function PublicHeader() {
  return (
    <header className='sticky top-0 border-b bg-background/80 backdrop-blur-sm px-20 py-3'>
      <div className='flex justify-between items-center'>
        <Link href='/'>
          <span className='font-bold text-xl sublime-text'>Surficial</span>
        </Link>
        <ModeToggle />
      </div>
    </header>
  )
}
