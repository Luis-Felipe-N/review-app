import { Button } from '@/app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ErrorMessage } from '../form/ErrorMessage'

const loginFormSchema = z.object({
  username: z.string().nonempty('Este campo é obrigatório'),
  password: z
    .string()
    .nonempty('Este campo é obrigatório')
    .min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function ModalLogin() {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  async function handleLogin(data: LoginFormData) {
    const resposeData = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    })

    if (resposeData?.error == 'CredentialsSignin') {
      setError('root', {
        message: 'Usuario ou senha incorreto',
      })
    } else {
      setOpen(false)
    }
  }

  return (
    <Dialog onOpenChange={(state) => setOpen(state)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-purple-600 hover:bg-purple-700">
          Fazer login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(handleLogin)}>
          <DialogHeader>
            <DialogTitle>Entrar no sistema</DialogTitle>
            <DialogDescription>
              Acesse sua conta de forma segura e rápida para aproveitar todos os
              recursos disponíveis.
            </DialogDescription>

            {errors.root && <ErrorMessage message={errors.root.message} />}
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="">
              <Label className="space-y-2">
                <span>Usuário</span>
                <Input {...register('username')} />
                {errors.username && (
                  <ErrorMessage message={errors.username.message} />
                )}
              </Label>
            </div>
            <div className="">
              <Label className="space-y-2">
                <span>Senhaas</span>
                <Input {...register('password')} type="password" />
                {errors.password && (
                  <ErrorMessage message={errors.password.message} />
                )}
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-gray-50"
            >
              Entrar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
