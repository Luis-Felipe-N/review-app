"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from "lucide-react";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ErrorMessage } from "@/components/Form/ErrorMessage";

const productFormShema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatorio"}),
  batch: z.string(),
  price: z.number().min(0.1, { message: "O preço deve ser maior que 0Y"}),
  link: z.string(),
  weight: z.number().min(0.1, { message: "O peso deve ser maior que 0g"})
})

type ProductFormData = z.infer<typeof productFormShema>

export default function Review() {
  const form = useForm<ProductFormData>({resolver: zodResolver(productFormShema)})

  const { handleSubmit, register, formState: { errors, isSubmitting } } = form

  function handleCreateProduct(data: ProductFormData) {
    console.log(data)
  }

  return (
    <div className="flex container mx-auto min-h-screen items-start py-12 gap-4">
      <Card className="w-full border-0 bg-zinc-900 p-8">
        <CardHeader>
          <CardTitle>Criar Deep review</CardTitle>
          <CardDescription>Crie um review para que outros possam analisar</CardDescription>
        </CardHeader>
        <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(handleCreateProduct)}>
          <div className="grid w-full items-center gap-4 space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="space-y-2">
                <span>Nome</span>
                <Input {...register('name')} id="name" className="h-14 px-4" placeholder="Nome do produto" />
                { errors.name && (
                  <ErrorMessage message={errors.name.message} />
                )}
              </Label>
            </div> 
            <div className="flex flex-col space-y-1.5">
              <Label className="space-y-2">
                <span>Batch</span>
                <Input {...register('batch')} id="batch" className="h-14 px-4" placeholder="Ex: M" />
                { errors.batch && (
                  <ErrorMessage message={errors.batch.message} />
                )}
              </Label>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="space-y-2">
                <span>Preço</span>
                <Input {...register('price', { valueAsNumber: true })} type="number" id="preco" className="h-14 px-4" placeholder="Preço do produto" />
                { errors.price && (
                  <ErrorMessage message={errors.price.message} />
                )}
              </Label>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="space-y-2">
                <span>Link</span>
                  <Input {...register('link')}  id="link" className="h-14 px-4" placeholder="Link do produto" />
                  { errors.link && (
                    <ErrorMessage message={errors.link.message} />
                  )}
              </Label>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="space-y-2">
                <span>Peso</span>
                <Input {...register('weight', { valueAsNumber: true })}  type="number" id="peso" className="h-14 px-4" placeholder="Peso do produto em gramas" />
                { errors.weight && (
                  <ErrorMessage message={errors.weight.message} />
                )}
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-zinc-50 font-bold">
            { isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando
              </>
            ) : (
              'Criar'
            )}
          </Button>
        </form>
        </CardContent>
      </Card>

      <Card className="w-full border-0 bg-zinc-900">
        <CardHeader>
          <CardTitle>Imagens do produto</CardTitle>
          <CardContent className="p-0">
            <div>
              <ul>
                <li className="bg-purple-950 p-4">
                  
                </li>
              </ul>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}
