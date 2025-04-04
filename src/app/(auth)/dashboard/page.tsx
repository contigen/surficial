import { getNFTAnalysis, getNFTStats } from '&/lib/db-queries'
import { redirect } from 'next/navigation'
import { DashboardView } from './dashboard-view'
import { Suspense } from 'react'
import { Spinner } from '&/components/ui/spinner'
import { auth } from '&/auth'

export default async function DashboardPage() {
  const userId = (await auth())?.user.id
  if (!userId) redirect('/auth')
  const nftStats = getNFTStats(userId)
  const nftAnalysis = getNFTAnalysis(userId)
  return (
    <div className='flex-col md:flex'>
      <div className='flex-1 p-8 pt-6 spaxce-y-4'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight sublime-text'>
            Dashboard
          </h2>
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
