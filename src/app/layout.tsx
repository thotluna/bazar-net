import { BottomBar, TopBar } from '@/components'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bazar-Net',
  description: 'Your online shop',
  openGraph: {
    title: 'Bazar-Net',
    url: `https://bazar-net.vercel.app`,
    images: ['https://bazar-net.vercel.app/bazar-net.png']
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </head>
      <body className={`${inter.className} w-screen h-screen container m-auto  max-w-3xl min-w-[370px] bg-slate-950`}>
        <main className="bg-[var(--color-bg)] min-h-full flex flex-col">
          <TopBar />
          {children}
          <BottomBar />
        </main>
      </body>
    </html>
  )
}
