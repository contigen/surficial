'use client'

import { Button } from '&/components/ui/button'
import { InputForm } from './input-form'
import { LoginActionState, loginUser } from '&/actions'
import { useRouter, useSearchParams } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { Spinner } from '&/components/ui/spinner'

export function SignInForm() {
  const params = useSearchParams()
  const router = useRouter()

  const initialState: LoginActionState = {
    message: ``,
  }

  const [state, formAction, pending] = useActionState(loginUser, initialState)

  useEffect(() => {
    if (state.message === `invalid data`) {
      toast.error(`Invalid form data`)
    } else if (state.message === `user logged_in`) {
      toast.success(`You are logged in`, {
        richColors: true,
      })
      router.refresh()
    } else if (state.message === `failed to login user`) {
      toast.error(`Failed to log in`)
    }
  }, [router, state])

  useEffect(() => {
    const error = params.get(`error`)
    if (error) {
      setTimeout(() => toast.info(`Authentication ${error} error`))
      router.replace(`login`)
    }
  }, [params, router])
  return (
    <form className='space-y-4 mt-2' action={formAction}>
      <InputForm />
      <Button className='w-full'>{pending ? Spinner : 'Sign Up'}</Button>
    </form>
  )
}
