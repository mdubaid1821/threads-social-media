import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/shared/Header'
import LeftsideBar from '@/components/shared/LeftsideBar'
import RightsideBar from '@/components/shared/RightsideBar'
import Footer from '@/components/shared/Footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads',
  description: 'My firs application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
        <html lang="en">
      <body className={inter.className}>
        <Header/>
        <main className='flex flex-row'>
            <LeftsideBar/>
            <section className='main-container'>
                <div className='w-full max-w-4xl'>
                    {children}
                </div>
            </section>
            <RightsideBar/>
        </main>
        <Footer/>
      </body>
    </html>
    </ClerkProvider>
    
  )
}
