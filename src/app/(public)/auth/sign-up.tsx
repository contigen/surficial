'use client'

import { Button } from '&/components/ui/button'
import { Input } from '&/components/ui/input'
import { InputForm } from './input-form'
import { useRouter } from 'next/navigation'
import { RegisterActionState, registerUser } from '&/actions'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { Spinner } from '&/components/ui/spinner'

export function SignUpForm() {
  const router = useRouter()

  const initialState: RegisterActionState = {
    message: ``,
  }

  const [state, formAction, pending] = useActionState(
    registerUser,
    initialState
  )

  useEffect(() => {
    if (state.message === `invalid data`) {
      toast.error(`Invalid form data`)
    } else if (state.message === `User already exists`) {
      toast.info(`User already exists!`)
    } else if (state.message === `user created`) {
      toast.success(`Your account has been created and you will be logged in`, {
        richColors: true,
      })
      router.refresh()
    } else if (state.message === `failed to create user`) {
      toast.error(`Failed to create account`)
    }
  }, [router, state])
  return (
    <form className='space-y-4 mt-2' action={formAction}>
      <Input placeholder='Name' name='name' required />
      <InputForm />
      <Button className='w-full' type='submit'>
        {pending ? Spinner : 'Sign Up'}
      </Button>
    </form>
  )
}
