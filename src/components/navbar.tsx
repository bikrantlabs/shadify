import { siteConfig } from '@/config/site'

import { Icons } from './icons'
import { ModeToggle } from './mode-toggle'

export const Navbar = () => {
  return (
    <>
      <div className="fixed h-16 w-full border-b">
        <div className="flex h-full w-full items-center px-4">
          <div className="flex items-center gap-2">
            <Icons.logo className="h-8 w-8" />
            <h1 className="text-xl font-semibold">{siteConfig.name}</h1>
          </div>
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="h-16"></div>
    </>
  )
}
