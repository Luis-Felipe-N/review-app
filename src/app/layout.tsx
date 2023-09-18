import { Header } from '@/app/components/Header'
import { ThemeProvider } from '@/app/components/theme-provider'
import { QueryProvider } from './provider/useQueryProvider'
import NextAuthSessionProvider from './provider/sessionProvider'
import { Toaster } from './components/ui/toaster'
import { Metadata } from 'next'
import './global.css'

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
      <body>
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
