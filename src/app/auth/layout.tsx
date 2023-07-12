import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex container mx-auto min-h-screen flex-col items-center justify-between p-24">
      <Card className="w-1/2 border-zinc-700 border-2 rounded-xl">
        <CardHeader>
          <CardTitle>Review APP</CardTitle>
          <CardDescription>
            Plataforma comunitária para avaliação de produtos comprados online.
          </CardDescription>
        </CardHeader>

        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}
