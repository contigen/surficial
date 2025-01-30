import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '&/components/ui/avatar'

const recentAnalyses = [
  {
    id: 1,
    name: 'CryptoPunk #3100',
    collection: 'CryptoPunks',
    result: 'Verified',
    image: '/placeholder.svg',
  },
  {
    id: 2,
    name: 'Bored Ape #1234',
    collection: 'Bored Ape Yacht Club',
    result: 'Suspicious',
    image: '/placeholder.svg',
  },
  {
    id: 3,
    name: 'Azuki #5678',
    collection: 'Azuki',
    result: 'Verified',
    image: '/placeholder.svg',
  },
  {
    id: 4,
    name: 'Doodle #9012',
    collection: 'Doodles',
    result: 'Verified',
    image: '/placeholder.svg',
  },
  {
    id: 5,
    name: 'CloneX #3456',
    collection: 'CloneX',
    result: 'Suspicious',
    image: '/placeholder.svg',
  },
]

export function RecentAnalyses() {
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
          {recentAnalyses.map(analysis => (
            <div key={analysis.id} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={analysis.image} alt={analysis.name} />
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
                className={`ml-auto font-medium ${
                  analysis.result === 'Verified'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {analysis.result}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
