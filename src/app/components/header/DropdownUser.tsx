import { SignOut } from '@phosphor-icons/react'
import { signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function DropdownUser() {
  const session = useSession()

  function handleSignout() {
    signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {session.status === 'authenticated' && (
          <Avatar className="w-10 h-10">
            <AvatarImage src={session.data.user.avatar_url} />
            <AvatarFallback>
              {session.data.user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleSignout}
          className="text-red-400 space-x-1 font-semibold"
        >
          <SignOut size={18} /> <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
