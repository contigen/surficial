import { auth } from '&/auth'
import { getNFTAnalysis, getNFTStats } from '&/lib/db-queries'
import { redirect } from 'next/navigation'
import { DashboardView } from './dashboard-view'
import { Suspense } from 'react'
import { Spinner } from '&/components/ui/spinner'

export default async function DashboardPage() {
  const userId = (await auth())?.user.id
  if (!userId) redirect('/auth')
  const nftStats = getNFTStats(userId)
  const nftAnalysis = getNFTAnalysis(userId)
  return (
    <div className='flex-col md:flex'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight sublime-text'>
            Dashboard
          </h2>
        </div>
        <Suspense fallback={<div>{Spinner}</div>}>
          <DashboardView {...{ nftStats, nftAnalysis }} />
        </Suspense>
      </div>
    </div>
  )
}
