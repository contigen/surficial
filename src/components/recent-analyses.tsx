import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '&/components/ui/avatar'

export function RecentAnalyses({
  nftAnalysis,
}: {
  nftAnalysis:
    | {
        id: string
        collection: string
        status: 'UNVERIFIED' | 'VERIFIED' | 'SUSPICIOUS'
        name: string
        imageURL: string
      }[]
    | null
}) {
  const recentAnalyses = [
    {
      id: 1,
      name: 'CryptoPunk #3100',
      collection: 'CryptoPunks',
      result: 'Verified',
      image: '/placeholder.svg',
    },
  ]
  return (
    <Card className='sublime-hover'>
      <CardHeader>
        <CardTitle>Recent Analyses</CardTitle>
        <CardDescription>
          Latest NFT analyses performed on the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {nftAnalysis?.map(analysis => (
            <div key={analysis.id} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={analysis.imageURL} alt={analysis.name} />
                <AvatarFallback>{analysis.name[0]}</AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {analysis.name}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {analysis.collection}
                </p>
              </div>
              <div
                className={`ml-auto font-medium capitalize ${
                  analysis.status === 'VERIFIED'
                    ? 'text-green-500'
                    : analysis.status === 'UNVERIFIED'
                    ? 'text-blue-500'
                    : 'text-red-500'
                }`}
              >
                {analysis.status.toLowerCase()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
