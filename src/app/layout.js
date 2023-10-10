import Layout from '@/components/layout/Layout'
import './globals.css'
import localFont from "next/font/local"
import NextAuthProviders from '@/providers/NextAuthProviders'
import { ApolloProviders } from '@/providers/ApolloProviders'
import MuiThemeProvider from '@/providers/MuiThemeProvider'

export const yekan = localFont({
  src: [{
    path: "../../public/fonts/YekanBakh-Light.woff2",
    weight: "100",
    style: "normal"
  }, {
    path: "../../public/fonts/YekanBakh-Regular.woff2",
    weight: "200",
    style: "normal"
  }, {
    path: "../../public/fonts/YekanBakh-Bold.woff2",
    weight: "400",
    style: "normal"
  }, {
    path: "../../public/fonts/YekanBakh-Heavy.woff2",
    weight: "600",
    style: "normal"
  }, {
    path: "../../public/fonts/YekanBakh-Fat.woff2",
    weight: "700",
    style: "normal"
  }]
})

export const metadata = {
  title: 'فیلم دانلودر',
  description: 'سایت دانلود فیلم و سریال',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={yekan.className}>
        <ApolloProviders>
          <NextAuthProviders>
            <MuiThemeProvider>
              <Layout>
                {children}
              </Layout>
            </MuiThemeProvider>
          </NextAuthProviders>
        </ApolloProviders>
      </body>
    </html>
  )
}
