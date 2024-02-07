import Link from 'next/link'

import { Icons } from './icons'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { Logo } from './ui/logo'

export const Navbar = () => {
  return (
    <>
      <div className="fixed h-16 w-full border-b">
        <div className="flex h-full w-full items-center px-4">
          <Logo />
          <div className="ml-auto flex items-center gap-4">
            <ModeToggle />
            <Button size="icon" variant="outline" asChild>
              <Link
                href="https://github.com/BikrantJung/shadify"
                target="_blank"
              >
                <Icons.github className="h-5 w-5 stroke-[1.5px]" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="h-16"></div>
    </>
  )
}
