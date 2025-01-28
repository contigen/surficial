import type { Metadata } from 'next'
import './globals.css'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from '&/components/theme-provider'
import { Toaster } from '&/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Surficial - AI-Powered NFT Forensics',
  description:
    'Verify NFT authenticity, detect duplicates, and assess metadata anomalies with ease.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${GeistSans.className} sublime-bg min-h-screen`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <div vaul-drawer-wrapper=''>{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
