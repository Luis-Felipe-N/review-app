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
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createAccountFormSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z
    .string()
    .nonempty('Este campo é obrigatório')
    .min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
})

type CreateAccountFormData = z.infer<typeof createAccountFormSchema>

export function ModalCreateAccount() {
  const { handleSubmit, register } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountFormSchema),
  })

  async function handleCreateAccount(credentials: CreateAccountFormData) {
    const data = api.post('/users', credentials)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="pl-0">
          Crie uma conta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(handleCreateAccount)}>
          <DialogHeader>
            <DialogTitle>Criar conta</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="">
              <Label className="space-y-2">
                <span>Nome</span>
                <Input {...register('name')} />
              </Label>
            </div>
            <div className="">
              <Label className="space-y-2">
                <span>Usuário</span>
                <Input {...register('username')} />
              </Label>
            </div>
            <div className="">
              <Label className="space-y-2">
                <span>Senha</span>
                <Input {...register('password')} type="password" />
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-gray-50"
            >
              Criar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
