
import './globals.css'
import Providers from './redux/Providers'
import { Toaster } from "@/components/ui/sonner"
// import TokenDataWrapper from './utils/TokenDataWrapper'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthContextProvider } from './utils/AuthWrapper'
import Head from 'next/head'
import OTPLessSigninComponent from './utils/OtplessSignin'

export const metadata = {
  title: 'Grovyo Ads',
  description: 'Created By Grovyo Platforms Pvt Ltd',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <script
          id="otpless-sdk"
          type="text/javascript"
          src="https://otpless.com/v2/headless.js"
          data-appid="cjpd2ercbflljxvrbrp9zcblt155uul1"
        ></script>

      </Head>

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
        <OTPLessSigninComponent />
      </body>
    </html>
  )
}
