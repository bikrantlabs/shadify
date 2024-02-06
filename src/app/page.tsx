import { siteConfig } from '@/config/site'
import { ConfigDisplayCard } from '@/components/cards/config-display-card'
import { ColorConversion } from '@/components/converter'
import { Icons } from '@/components/icons'

export default function Home() {
  return (
    <main className="flex">
      <div className="container mt-6 flex max-w-[72rem] flex-col items-center gap-4 text-center">
        <Icons.logo className="h-16 w-16" />
        <h1 className="text-2xl font-semibold tracking-tight sm:text-5xl md:text-4xl lg:text-5xl">
          Paste the color and get your data
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {siteConfig.description}
        </p>
        <div className="flex h-full max-h-[350px] w-full flex-col gap-2 overflow-scroll md:flex-row">
          <div className="flex-1 ">
            <ColorConversion />
          </div>
          <div className="h-full flex-[2_2_0%]">
            <ConfigDisplayCard />
          </div>
        </div>
      </div>
    </main>
  )
}
