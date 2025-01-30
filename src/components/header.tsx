import { ModeToggle } from './mode-toggle'
import { UserNav } from './user-nav'
import { WalletConnection } from './wallet-connection'
import Link from 'next/link'

export function Header() {
  return (
    <header className='sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-sm'>
      <div className='container flex h-16 items-center'>
        <div className='mr-4 hidden md:flex'>
          <Link href='/' className='mr-6 flex items-center space-x-2'>
            <span className='hidden font-bold sm:inline-block text-xl sublime-text'>
              Surficial
            </span>
          </Link>
          <nav className='flex items-center space-x-6 text-sm font-medium'>
            <Link
              href='/dashboard'
              className='transition-colors hover:text-primary'
            >
              Dashboard
            </Link>
            <Link
              href='/analyze'
              className='transition-colors hover:text-primary'
            >
              Analyze
            </Link>
            <Link
              href='/search'
              className='transition-colors hover:text-primary'
            >
              Search
            </Link>
            <Link
              href='/report-fraud'
              className='transition-colors hover:text-primary'
            >
              Report Fraud
            </Link>
          </nav>
        </div>
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-2'>
            <WalletConnection />
            <ModeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
