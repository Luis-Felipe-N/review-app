'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'

export default function Login() {
  const form = useForm()

  const { handleSubmit, control } = form

  function handleLogin() {}

  return (
    <Form {...form}>
      <form
        className="space-y-4 flex flex-col"
        onSubmit={handleSubmit(handleLogin)}
      >
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input
                  className="h-14 px-4 rounded-xl border-zinc-600 placeholder:text-zinc-400"
                  placeholder="luisnunes"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-zinc-400 text-xs ">
                Como deseja ser chamado.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  className="h-14 px-4 rounded-xl border-zinc-600 placeholder:text-zinc-400"
                  placeholder="****"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <Button className="rounded-xl w-100 h-14 px-4 bg-green-700 hover:bg-green-800">
          Entrar
        </Button>
      </form>
    </Form>
  )
}
