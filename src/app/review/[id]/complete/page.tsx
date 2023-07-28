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
import { Loader2 } from 'lucide-react'
import { ErrorMessage } from '@/app/components/Form/ErrorMessage'
import { MultiStep } from '@/app/components/MultiStep'
import { ArrowArcRight, ArrowRight } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/app/components/ui/textarea'
import { api, apiClient } from '@/lib/api'

interface CreateReviewProps {
  params: {
    id: string
  }
}

const completeProductFormShema = z.object({
  link: z.string(),
  batch: z.string(),
  description: z.string(),
})

type PreProductFormData = z.infer<typeof completeProductFormShema>

export default function CreateReview({ params }: CreateReviewProps) {
  const form = useForm<PreProductFormData>({
    resolver: zodResolver(completeProductFormShema),
  })

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = form

  const router = useRouter()

  async function handleCreateProduct(data: PreProductFormData) {
    const { batch, link, description } = data

    try {
      const responseData = await apiClient.put(`review/${params.id}/complete/`, {
        batch, link, description,
      })

      router.push(`/review/${responseData.data.review.id}/`)
    } catch (error) {
      setError('root', {
        message: "Ocorreu algum erro em completar sua review",
      })
    }
    // router.push('create-review/complete')
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
          <MultiStep size={2} currentStep={2} />
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
                  <span>
                    Batch <small>(opcional)</small>
                  </span>
                  <Input
                    {...register('batch')}
                    className="h-12 px-4"
                    placeholder="Informe a batch do produto"
                  />
                  {errors.batch && (
                    <ErrorMessage message={errors.batch.message} />
                  )}
                </Label>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="space-y-2">
                  <span>
                    Link <small>(opcional)</small>
                  </span>
                  <Input
                    {...register('link')}
                    className="h-12 px-4"
                    placeholder="Link do produto"
                  />
                  {errors.link && (
                    <ErrorMessage message={errors.link.message} />
                  )}
                </Label>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="space-y-2">
                  <span>
                    Cometário <small>(opcional)</small>
                  </span>
                  <Textarea
                    {...register('description')}
                    className="h-12 px-4"
                    placeholder="Diga o que achou do produto"
                  />
                  {errors.description && (
                    <ErrorMessage message={errors.description.message} />
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
                <span>Finalizar</span>
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
