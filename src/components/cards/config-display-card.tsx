'use client'

import { useConfigDataStore } from '@/hooks/use-config-data-store'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

import { CodeBlock } from '../ui/code-block'

export const ConfigDisplayCard = () => {
  const { state } = useConfigDataStore((state) => state)
  if (!state.configData) return null
  return (
    <div className="h-full flex-[2_2_0%]">
      <div className="flex h-full max-h-[350px] w-full flex-col overflow-scroll rounded-lg border shadow-sm">
        <CardHeader>
          <CardTitle>Generated Config</CardTitle>
          <CardDescription>Paste the config in respective file</CardDescription>
        </CardHeader>
        {state.configData && (
          <div className="mb-4 flex flex-col gap-6">
            <div className="flex-1 px-6">
              <div className="flex w-full flex-col items-start gap-2">
                <Label>globals.css</Label>
                <CodeBlock data={state.configData?.globalsCSS.hslString} />
              </div>
            </div>
            <div className="flex-1 px-6">
              <div className="flex w-full flex-col items-start gap-2">
                <Label>tailwind.config.js</Label>
                <CodeBlock data={state.configData?.tailwindConfig} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
