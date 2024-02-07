import Link from 'next/link'

import { siteConfig } from '@/config/site'

import { Icons } from '../icons'

export const Logo = () => {
  return (
    <Link href={'/'}>
      <div className="flex items-center gap-2">
        <Icons.logo className="h-8 w-8" />
        <h1 className="text-xl font-semibold">{siteConfig.name}</h1>
      </div>
    </Link>
  )
}
