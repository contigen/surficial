import { Button } from '&/components/ui/button'
import { Input } from '&/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { Label } from '&/components/ui/label'
import { Switch } from '&/components/ui/switch'

export default function SettingsPage() {
  return (
    <div className='container py-10 mx-auto'>
      <h1 className='mb-6 text-4xl font-bold neon-text'>User Settings</h1>
      <Card className='glass-card'>
        <CardHeader>
          <CardTitle className='neon-text'>Account Settings</CardTitle>
          <CardDescription>
            Manage your account preferences and connected wallets
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='your@email.com'
              className='glass-card'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='wallet'>Connected Wallet</Label>
            <Input
              id='wallet'
              placeholder='0x1234...5678'
              disabled
              className='glass-card'
            />
          </div>
          <div className='flex justify-between items-center'>
            <Label htmlFor='notifications'>Email Notifications</Label>
            <Switch id='notifications' />
          </div>
          <div className='flex justify-between items-center'>
            <Label htmlFor='darkMode'>Dark Mode</Label>
            <Switch id='darkMode' />
          </div>
          <Button className='w-full neon-border'>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}
