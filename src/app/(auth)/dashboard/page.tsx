import { Tabs, TabsContent, TabsList, TabsTrigger } from '&/components/ui/tabs'
import { Overview } from '&/components/overview'
import { RecentAnalyses } from '&/components/recent-analyses'
import { NFTAnalytics } from '&/components/nft-analytics'
import { CollectionAnalytics } from '&/components/collection-analytics'
import { FraudDetectionInsights } from '&/components/fraud-detection-insights'

export default function DashboardPage() {
  return (
    <div className='flex-col md:flex'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight sublime-text'>
            Dashboard
          </h2>
        </div>
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList className='bg-background/80 backdrop-blur-sm'>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='nft-analytics'>NFT Analytics</TabsTrigger>
            <TabsTrigger value='collection-analytics'>
              Collection Analytics
            </TabsTrigger>
            <TabsTrigger value='fraud-detection'>Fraud Detection</TabsTrigger>
          </TabsList>
          <TabsContent value='overview' className='space-y-4'>
            <Overview />
            <RecentAnalyses />
          </TabsContent>
          <TabsContent value='nft-analytics' className='space-y-4'>
            <NFTAnalytics />
          </TabsContent>
          <TabsContent value='collection-analytics' className='space-y-4'>
            <CollectionAnalytics />
          </TabsContent>
          <TabsContent value='fraud-detection' className='space-y-4'>
            <FraudDetectionInsights />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
