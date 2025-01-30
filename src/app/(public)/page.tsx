import Link from 'next/link'
import { Button } from '&/components/ui/button'
import {
  ArrowRight,
  Zap,
  Shield,
  Search,
  Fingerprint,
  TrendingUp,
  Database,
} from 'lucide-react'
import { Footer } from '&/components/footer'

export default function Home() {
  return (
    <div>
      <section className='py-12 w-full md:py-24 lg:py-32 xl:py-48'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none animate-fade-up sublime-text'>
                AI-Powered NFT Forensics
              </h1>
              <p
                className='mx-auto max-w-[700px] text-muted-foreground md:text-xl animate-fade-up'
                style={{ animationDelay: '0.2s' }}
              >
                Verify authenticity, detect duplicates, and assess metadata
                anomalies with ease using BitsCrunch APIs and cutting-edge AI
                technology.
              </p>
            </div>
            <div
              className='space-x-4 animate-fade-up'
              style={{ animationDelay: '0.4s' }}
            >
              <Button
                asChild
                size='lg'
                className='bg-primary text-primary-foreground hover:bg-primary/90'
              >
                <Link href='/dashboard'>
                  Get Started <ArrowRight className='ml-2 w-4 h-4' />
                </Link>
              </Button>
              <Button asChild size='lg' variant='outline'>
                <Link href='#features'>Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section
        id='features'
        className='py-12 w-full md:py-24 lg:py-32 bg-secondary/50'
      >
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col justify-center items-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl sublime-text'>
                Features
              </h2>
              <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Surficial offers a comprehensive suite of tools for NFT analysis
                and verification.
              </p>
            </div>
          </div>
          <div className='grid gap-6 items-center py-12 mx-auto max-w-5xl lg:grid-cols-3 lg:gap-12'>
            {[
              {
                icon: Zap,
                title: 'AI-Powered Analysis',
                description: 'Leverage cutting-edge AI to analyze your NFTs',
              },
              {
                icon: Shield,
                title: 'Duplicate Detection',
                description:
                  'Identify potential duplicates across multiple blockchains',
              },
              {
                icon: Search,
                title: 'Metadata Insights',
                description: "Get deep insights into your NFT's metadata",
              },
              {
                icon: Fingerprint,
                title: 'Ownership Verification',
                description: 'Verify the true ownership of any NFT',
              },
              {
                icon: Database,
                title: 'Collection Audits',
                description:
                  'Perform comprehensive audits on entire NFT collections',
              },
              {
                icon: TrendingUp,
                title: 'Market Trends',
                description: 'Stay informed about the latest NFT market trends',
              },
            ].map((item, index) => (
              <div
                key={index}
                className='flex flex-col items-center p-6 space-y-4 rounded-lg backdrop-blur-sm sublime-hover bg-background/80'
              >
                <div className='flex justify-center items-center w-12 h-12 rounded-full bg-primary/10'>
                  <item.icon className='w-6 h-6 text-primary' />
                </div>
                <h3 className='text-xl font-bold'>{item.title}</h3>
                <p className='text-center text-muted-foreground'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
