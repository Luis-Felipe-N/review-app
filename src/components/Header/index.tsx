'use client'

import { Fire } from '@phosphor-icons/react'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu'

export function Header() {
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
          <Link href={'/'} className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://doodleipsum.com/700/avatar-2?i=de7ef159acaa49833815766098126673" />
              <AvatarFallback>LF</AvatarFallback>
            </Avatar>
          </Link>
          <Link href={'/perfil/review'} className="flex items-center gap-2">
            <Button className="bg-purple-600 hover:bg-purple-700 text-zinc-50">
              Criar um review
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
