'use client'

import { Fire } from '@phosphor-icons/react'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ModalCreateAccount } from './auth/ModalCreateAccount'
import { ModalLogin } from './auth/ModalLogin'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu'

export function Header() {
  const session = useSession()

  console.log(session)

  return (
    <header className="bg-zinc-900">
      <div className="container mx-auto h-20 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Deep_review</h1>

        <NavigationMenu>
          <NavigationMenuList className="space-x-6">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={''}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/recomendados" legacyBehavior passHref>
                <NavigationMenuLink className={''}>
                  Recomendados
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/como-importar" legacyBehavior passHref>
                <NavigationMenuLink className={''}>
                  Como importar?
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/ofertas" legacyBehavior passHref>
                <NavigationMenuLink className={'flex items-center '}>
                  Ofertas
                  <Fire weight="bold" width={20} className=" text-purple-400" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex space-x-4 items-center">
          <Search />
          { session.status == "authenticated" ? (
            <>
              <Link href={'/'} className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={session.data.user.avatar_url} />
                  <AvatarFallback>{session.data.user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </Link> 
              <Link href={'/review/create-review'} className="flex items-center gap-2">
                <Button className="bg-purple-600 hover:bg-purple-700 text-zinc-50">
                  Criar um review
                </Button>
              </Link>
            </>
          ) : (
            <div className='space-x-2'>
              <ModalLogin />
              <ModalCreateAccount />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
