
import './globals.css'
import Providers from './redux/Providers'
import { Toaster } from "@/components/ui/sonner"
// import TokenDataWrapper from './utils/TokenDataWrapper'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthContextProvider } from './utils/AuthWrapper'

export const metadata = {
  title: 'Grovyo Ads',
  description: 'Created By Grovyo Platforms Pvt Ltd',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='select-none'>
        <AuthContextProvider>
          <Providers>
            {/* <TokenDataWrapper>{children}</TokenDataWrapper> */}
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </Providers>
        </AuthContextProvider>
        <Toaster />
      </body>
    </html>
  )
}
