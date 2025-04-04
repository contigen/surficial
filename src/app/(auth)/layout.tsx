import { SessionProvider } from 'next-auth/react'
import { Header } from '&/components/header'
import { Provider } from 'jotai'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <Provider>
        <div suppressHydrationWarning>
          <Header />
          <main>{children}</main>
        </div>
      </Provider>
    </SessionProvider>
  )
}
