import { ModeToggle } from './mode-toggle'
import { UserNav } from './user-nav'
import { WalletConnection } from './wallet-connection'
import Link from 'next/link'

export function Header() {
  return (
    <header className='sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-sm'>
      <div className='container flex items-center h-16'>
        <div className='hidden mr-4 md:flex'>
          <Link href='/' className='flex items-center mr-6 space-x-2'>
            <span className='hidden text-xl font-bold sm:inline-block sublime-text'>
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
        <div className='flex items-center justify-end flex-1 space-x-4'>
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
