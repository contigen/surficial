import { Avatar, AvatarFallback, AvatarImage } from '&/components/ui/avatar'

const activities = [
  {
    user: 'You',
    action: 'analyzed',
    item: 'CryptoPunk #3100',
    time: '2 hours ago',
    result: 'Authentic',
  },
  {
    user: 'System',
    action: 'detected',
    item: 'potential duplicate',
    time: '4 hours ago',
    result: 'Flagged',
  },
  {
    user: 'You',
    action: 'verified',
    item: 'Bored Ape #1234',
    time: 'Yesterday',
    result: 'Authentic',
  },
  {
    user: 'You',
    action: 'compared',
    item: '2 NFTs',
    time: '2 days ago',
    result: 'Similar',
  },
]

export function Activity() {
  return (
    <div className='space-y-8'>
      {activities.map((activity, index) => (
        <div key={index} className='flex items-center'>
          <Avatar className='w-9 h-9'>
            <AvatarImage src={`/avatars/0${index + 1}.png`} alt='Avatar' />
            <AvatarFallback>{activity.user[0]}</AvatarFallback>
          </Avatar>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {activity.user} {activity.action} {activity.item}
            </p>
            <p className='text-sm text-muted-foreground'>{activity.time}</p>
          </div>
          <div
            className={`ml-auto font-medium ${
              activity.result === 'Authentic'
                ? 'text-green-500'
                : activity.result === 'Flagged'
                ? 'text-red-500'
                : 'text-yellow-500'
            }`}
          >
            {activity.result}
          </div>
        </div>
      ))}
    </div>
  )
}
