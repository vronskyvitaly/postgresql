'use client'
import { authenticate } from '@/actions/auth'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'

const initialState = { success: undefined, errors: { password: [] } }

export default function SigninForm() {
  const router = useRouter()
  const [state, action, isPending] = useActionState(authenticate, initialState)

  useEffect(() => {
    console.log('state:', state)
    if (state?.success === 'true') {
      router.push('/dashboard')
    }
  }, [state, router])

  return (
    <form action={action} id={'login'} className={'h-full flex flex-col pt-10 items-center'}>
      <div className={'text-foreground m-10 text-xl'}>Login</div>
      <Input className={'mb-4'} inputSize={'medium'} name={'email'} placeholder={'email'} label={'email'} />
      <Input
        maxLength={36}
        inputSize={'medium'}
        name={'password'}
        type='password'
        placeholder={'******'}
        label={'Password'}
        errorMessage={state?.errors?.password ? state.errors.password[0] : ''}
      />
      <Button className={'bg-foreground text-background h-10 w-full mt-auto'} type={'submit'} disabled={isPending}>
        {isPending ? 'Входим...' : 'Login'}
      </Button>
    </form>
  )
}
