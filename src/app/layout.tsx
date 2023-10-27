import { Header } from '@/app/components/header'
import { ThemeProvider } from '@/app/components/theme-provider'
import { QueryProvider } from './provider/useQueryProvider'
import NextAuthSessionProvider from './provider/sessionProvider'
import { Toaster } from './components/ui/toaster'
import { Metadata } from 'next'
import './global.css'


import { Poppins } from 'next/font/google'

const openSans = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '400', '500', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'Inicio | DeepReview',
  description:
    'Descubra avaliações de produtos importados feita pela comunidade, ajudando você a escolher com confiança.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={openSans.className}>
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
