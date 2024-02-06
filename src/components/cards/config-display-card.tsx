'use client'

import { useConfigDataStore } from '@/hooks/use-config-data-store'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

import { CodeBlock } from '../ui/code-block'

export const ConfigDisplayCard = () => {
  const { state } = useConfigDataStore((state) => state)
  return (
    <div className="flex h-full max-h-[350px] w-full flex-col overflow-scroll rounded-lg border shadow-sm">
      <CardHeader>
        <CardTitle>Generated Config</CardTitle>
      </CardHeader>
      {state.configData && (
        <div className="flex flex-col">
          <div className="flex-1 p-6">
            <div className="flex w-full flex-col items-start gap-2">
              <Label>globals.css</Label>
              <CodeBlock data={state.configData?.globalsCSS.hslString} />
            </div>
          </div>
          <div className="flex-1 p-6">
            <div className="flex w-full flex-col items-start gap-2">
              <Label>tailwind.config.js</Label>
              <CodeBlock
                data={JSON.stringify(state.configData?.tailwindConfig, null, 2)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
    // <Card className="h-full w-full">
    //   <CardHeader>
    //     <CardTitle>Generated Config</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     <Label>globals.css</Label>
    //   </CardContent>
    // </Card>
  )
}
