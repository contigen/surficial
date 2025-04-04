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
import { auth } from '&/auth'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user) redirect(`/auth`)
  const { email, walletAddress } = session.user
  return (
    <div className='container py-10 mx-auto'>
      <h1 className='mb-6 text-4xl font-bold neon-text'>User Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle className='neon-text'>Account Settings</CardTitle>
          <CardDescription>
            Manage your account preferences and connected wallets
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <form>
            <fieldset className='space-y-4' disabled>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' placeholder={email!} />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='wallet'>Connected Wallet</Label>
                <Input id='wallet' placeholder={walletAddress!} disabled />
              </div>
              <div className='flex items-center justify-between'>
                <Label htmlFor='notifications'>Email Notifications</Label>
                <Switch id='notifications' />
              </div>
              <div className='flex items-center justify-between'>
                <Label htmlFor='darkMode'>Dark Mode</Label>
                <Switch id='darkMode' />
              </div>
              <Button className='w-full'>Save Changes</Button>
            </fieldset>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
