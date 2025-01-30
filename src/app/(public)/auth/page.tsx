import { Button } from '&/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '&/components/ui/tabs'
import Link from 'next/link'
import { SignUpForm } from './sign-up'
import { SignInForm } from './sign-in'

export default function AuthPage() {
  return (
    <div className='container flex justify-center items-center py-10 mx-auto h-[calc(100vh-30px)]'>
      <Card className='w-full max-w-md glass-effect'>
        <CardHeader>
          <CardTitle className='text-2xl text-center '>
            Welcome to{' '}
            <Link href='/' className='sublime-text sublime-hover inline-block'>
              Surficial
            </Link>
          </CardTitle>
          <CardDescription className='text-center'>
            Sign in or create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='signin'>
            <TabsList className='grid grid-cols-2 w-full'>
              <TabsTrigger value='signin'>Sign In</TabsTrigger>
              <TabsTrigger value='signup'>Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value='signin'>
              <SignInForm />
            </TabsContent>
            <TabsContent value='signup'>
              <SignUpForm />
            </TabsContent>
          </Tabs>
          <div className='mt-1 text-center'>
            <Button variant='link' asChild>
              <Link href='/connect-wallet'>Connect Wallet</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
