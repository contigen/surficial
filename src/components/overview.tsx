import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'

export function Overview({
  totalNFTs,
  verifiedNFTs,
  suspiciousNFTs,
  collectionsAmount,
}: {
  totalNFTs: number
  verifiedNFTs: number
  suspiciousNFTs: number
  collectionsAmount: number
}) {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {[
        {
          title: 'Total NFTs Analyzed',
          value: totalNFTs,
        },
        {
          title: 'Verified NFTs',
          value: verifiedNFTs,
        },
        {
          title: 'Suspicious NFTs',
          value: suspiciousNFTs,
        },
        {
          title: 'Collections Analyzed',
          value: collectionsAmount,
        },
      ].map((item, index) => (
        <Card
          key={index}
          className='transition-all hover:-translate-y-1 duration-300 ease-in-out'
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
