'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { ErrorMessage } from '@/components/Form/ErrorMessage'
import { MultiStep } from '@/components/MultiStep'
import { ArrowRight } from '@phosphor-icons/react'
import { redirect, useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { useSession } from 'next-auth/react'

const preProductFormShema = z.object({
  name: z.string().nonempty({ message: 'Nome é obrigatorio' }),
  price: z.number(),
  weight: z.number(),
  albumLink: z.string()
})

type PreProductFormData = z.infer<typeof preProductFormShema>

export default function CreateReview() {
  const session = useSession()

  if (session.status == "unauthenticated") return redirect('/')

  const form = useForm<PreProductFormData>({
    resolver: zodResolver(preProductFormShema),
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form
  const router = useRouter()

  async function handleCreateProduct(data: PreProductFormData) {
    const { name, price, weight, albumLink } = data
    const responseData = await api.post('users/create-review/', {
      name,
      price,
      weight,
      albumLink,
      userId: session.data?.user.id
    })
    router.push('create-review/complete')
  }

  return (
    <div className="flex container mx-auto min-h-full flex-col justify-center items-center py-12 gap-4">
      <Card className="w-1/2 border-0">
        <CardHeader>
          <CardTitle>Criar Deep review</CardTitle>
          <CardDescription>
            Crie um review para que outros possam analisar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MultiStep size={2} />
        </CardContent>
      </Card>

      <Card className="w-1/2 border-0 bg-zinc-900 p-8">
        <CardContent className="p-0">
          <form
            className="space-y-8"
            onSubmit={handleSubmit(handleCreateProduct)}
          >
            <div className="grid w-full items-center gap-4 space-y-2">
              <div className="flex flex-col space-y-1.5">
                <Label className="space-y-2">
                  <span>Adicione imagem</span>
                  <Input
                    {...register('albumLink')}
                    className="h-12 px-4"
                    placeholder="Nome do produto"
                  />
                  {errors.albumLink && (
                    <ErrorMessage message={errors.albumLink.message} />
                  )}
                </Label>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="space-y-2">
                  <span>Nome</span>
                  <Input
                    {...register('name')}
                    id="name"
                    className="h-12 px-4"
                    placeholder="Nome do produto"
                  />
                  {errors.name && (
                    <ErrorMessage message={errors.name.message} />
                  )}
                </Label>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label className="space-y-2">
                  <span>Preço</span>
                  <Input
                    {...register('price', { valueAsNumber: true })}
                    type="number"
                    id="preco"
                    className="h-12 px-4"
                    placeholder="Preço do produto"
                  />
                  {errors.price && (
                    <ErrorMessage message={errors.price.message} />
                  )}
                </Label>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label className="space-y-2">
                  <span>Peso</span>
                  <Input
                    {...register('weight', { valueAsNumber: true })}
                    type="number"
                    id="peso"
                    className="h-12 px-4"
                    placeholder="Peso do produto em gramas"
                  />
                  {errors.weight && (
                    <ErrorMessage message={errors.weight.message} />
                  )}
                </Label>
              </div>
            </div>

            {isSubmitting ? (
              <Button type="submit" className="w-full font-bold" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 space-x-2 text-zinc-50 font-bold"
              >
                <span>Proximo</span>
                <ArrowRight />
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}