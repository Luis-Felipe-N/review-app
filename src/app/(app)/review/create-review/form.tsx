'use client'

import { Button } from '@/app/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader2 } from 'lucide-react'
import { ErrorMessage } from '@/app/components/form/ErrorMessage'
import { MultiStep } from '@/app/components/MultiStep'
import { redirect, useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api'
import { useSession } from 'next-auth/react'
import { AxiosError } from 'axios'
import { useToast } from '@/app/components/ui/use-toast'

const preProductFormShema = z.object({
  name: z.string().nonempty({ message: 'Nome é obrigatorio' }),
  price: z.number(),
  weight: z.number(),
  albumLink: z.string(),
})

type PreProductFormData = z.infer<typeof preProductFormShema>

export function FormCreateReview() {
  const session = useSession()
  const { toast } = useToast()

  const form = useForm<PreProductFormData>({
    resolver: zodResolver(preProductFormShema),
  })

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = form
  
  const router = useRouter()

  if (session.status == 'unauthenticated') return redirect('/')


  async function handleCreateProduct(data: PreProductFormData) {
    const { name, price, weight, albumLink } = data

    try {
      const responseData = await apiClient.post('review/create-review/', {
        name,
        price,
        weight,
        albumLink,
        userId: session.data?.user.id,
      })

      toast({
        title: 'Criando review',
        description: 'Review criada com sucesso.',
      })
      router.push(`/review/${responseData.data.review.id}/complete`)
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : 'Ocorreu algum erro em criar sua review'

      setError('root', {
        message,
      })
    }
  }

  return (
    <>
      <Card className="w-1/2 border-0">
        <CardHeader>
          <CardTitle>Criar Deep review</CardTitle>
          <CardDescription>
            Crie um review para que outros possam analisar
          </CardDescription>
          {errors.root && <ErrorMessage message={errors.root.message} />}
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
                  <span>Adicione link do (imgur)</span>
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
                <ArrowRight size={14} />
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </>
  )
}
