import { Input } from '&/components/ui/input'

export function InputForm() {
  return (
    <>
      <Input placeholder='Email' type='email' name='email' required />
      <Input placeholder='Password' type='password' name='password' required />
    </>
  )
}
