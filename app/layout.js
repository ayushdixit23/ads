"use client"
import './globals.css'
import Providers from './redux/Providers'
import { Toaster } from "@/components/ui/sonner"
import TokenDataWrapper from './utils/TokenDataWrapper'

const metadata = {
  title: 'Grovyo Ads',
  description: 'Created By Grovyo Platforms Pvt Ltd',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='select-none'>
        <Providers>
          <TokenDataWrapper>{children}</TokenDataWrapper>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
