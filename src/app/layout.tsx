import type { Metadata } from 'next'
import './globals.css'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '&/components/ui/sonner'

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
      <body
        className={`${GeistSans.className} sublime-bg min-h-screen antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <div vaul-drawer-wrapper=''>{children}</div>
          <Toaster closeButton duration={3000} />
        </ThemeProvider>
      </body>
    </html>
  )
}
