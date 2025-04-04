import { getNFTAnalysis, getNFTStats } from '&/lib/db-queries'
import { redirect } from 'next/navigation'
import { DashboardView } from './dashboard-view'
import { Suspense } from 'react'
import { Spinner } from '&/components/ui/spinner'
import { auth } from '&/auth'
import { unstable_cache } from 'next/cache'

export default async function DashboardPage() {
  const userId = (await auth())?.user.id
  if (!userId) redirect('/auth')
  const nftStats = unstable_cache(() => getNFTStats(userId), [userId], {
    tags: ['nft-stats'],
  })()
  const nftAnalysis = unstable_cache(() => getNFTAnalysis(userId), [userId], {
    tags: ['nft-analysis'],
  })()
  return (
    <div className='flex-col md:flex'>
      <div className='flex-1 p-8 pt-6 spaxce-y-4'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight sublime-text'>
            Dashboard
          </h1>
        </div>
        <Suspense
          fallback={
            <div className='my-2'>{<Spinner strokeColor='#A1A1AA' />}</div>
          }
        >
          <DashboardView {...{ nftStats, nftAnalysis }} />
        </Suspense>
      </div>
    </div>
  )
}
