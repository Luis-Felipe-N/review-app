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
import { ErrorMessage } from '../form/ErrorMessage'
import { Loader2 } from 'lucide-react'
import { AxiosError } from 'axios'
import { useToast } from '../ui/use-toast'

const createAccountFormSchema = z.object({
  avatar_url: z.string(),
  name: z.string(),
  username: z.string(),
  password: z
    .string()
    .nonempty('Este campo é obrigatório')
    .min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
})

type CreateAccountFormData = z.infer<typeof createAccountFormSchema>

export function ModalCreateAccount() {
  const {toast} = useToast()
  const { handleSubmit, register, setError, formState: { errors, isSubmitting } } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountFormSchema),
  })

  async function handleCreateAccount(credentials: CreateAccountFormData) {
    try {
      const responseData = await api.post('/users', credentials)

      toast({
        title: "Cadastro",
        description: "O Cadastro foi realizando com sucesso"
      })
    } catch (error) {
      if ((error instanceof AxiosError) && error.response) {
        switch (error.response.data.message) {
          case "Username already taken.":
            setError('root', {
              message: 'Usuário indisponivel',
            })
            break;

          default:
            setError('root', {
              message: 'Erro ao realizar o cadastro',
            })
            break;
        }
      }
    }
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

            {errors.root && <ErrorMessage message={errors.root.message} />}
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Label className="space-y-2">
              <span>Avatar URL</span>
              <Input {...register('avatar_url')} />
            </Label>
            
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
            {
              !isSubmitting ? (
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-gray-50"
                >
                  Criar
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-gray-50"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Carregando
                </Button>
              )
            }

          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
