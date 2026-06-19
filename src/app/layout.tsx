import type { Metadata } from 'next'
import { Inter, Press_Start_2P } from 'next/font/google'
import './globals.css'
import { StoreProvider } from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const minecraft = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-minecraft',
})

export const metadata: Metadata = {
  title: 'EndWar Store | Premium Minecraft Server',
  description: 'Support EndWar Lifesteal SMP and unlock exclusive keys, ranks, and rewards.',
  keywords: 'minecraft, lifesteal, server, store, keys, ranks, endwar',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${minecraft.variable}`}>
      <body className="min-h-screen bg-[#08000d]">
        <StoreProvider>
          <LoadingScreen />
          <Navbar />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}
