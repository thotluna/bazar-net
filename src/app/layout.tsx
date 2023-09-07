import { BottomBar, TopBar } from '@/components'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bazar-Net',
  description: 'Your online shop'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-screen h-screen container m-auto  max-w-3xl min-w-[330px] bg-slate-950`}>
        <main className="bg-[var(--color-bg)] min-h-full flex flex-col">
          <TopBar />
          {children}
          <BottomBar />
        </main>
      </body>
    </html>
  )
}
