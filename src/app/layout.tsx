import { BottomBar, TopBar } from '@/components'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://bazar-net.vercel.app'),
  title: {
    default: 'Bazar-Net',
    template: '%s | Bazar-Net'
  },
  description: 'Your online shop',
  manifest: 'https://bazar-net.vercel.app/manifest',
  openGraph: {
    title: 'Bazar-Net',
    description: 'You shop online',
    url: `https://bazar-net.vercel.app`,
    siteName: 'Bazar-Net',
    images: [
      {
        url: 'https://bazar-net.vercel.app/bazar-net.png',
        width: 244,
        height: 250
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bazar-Net',
    description: 'Your online shop',
    images: 'https://bazar-net.vercel.app/bazar-net.png'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </head>
      <body className={`${inter.className} w-screen h-screen container m-auto  max-w-3xl min-w-[270px] bg-slate-950`}>
        <main className="bg-[var(--color-bg)] min-h-full flex flex-col">
          <TopBar />
          {children}
          <BottomBar />
        </main>
      </body>
    </html>
  )
}
