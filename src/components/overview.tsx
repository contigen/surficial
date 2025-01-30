import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'

export function Overview() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {[
        {
          title: 'Total NFTs Analyzed',
          value: '10,234',
          change: '+20.1% from last month',
        },
        {
          title: 'Verified NFTs',
          value: '8,945',
          change: '+15.3% from last month',
        },
        {
          title: 'Suspicious NFTs',
          value: '1,289',
          change: '+5.7% from last month',
        },
        {
          title: 'Collections Analyzed',
          value: '156',
          change: '+12.9% from last month',
        },
      ].map((item, index) => (
        <Card key={index} className='sublime-hover'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{item.value}</div>
            <p className='text-xs text-muted-foreground'>{item.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
