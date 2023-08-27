import { Header } from '@/app/components/Header'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/app/components/theme-provider'
import { QueryProvider } from './provider/useQueryProvider'
import NextAuthSessionProvider from './provider/sessionProvider'

import './global.css'
import { Toaster } from './components/ui/toaster'
import { DefaultSeo } from 'next-seo'

export const metadata: Metadata = {
  title: 'Página inicial / DeepReview',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'pt_BR',
            url: 'https://www.deepreview.luisfelipenunes.com/',
            siteName: 'Deep Review',
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextAuthSessionProvider>
            <QueryProvider>
              <Header />
              {children}
              <Toaster />
            </QueryProvider>
          </NextAuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
