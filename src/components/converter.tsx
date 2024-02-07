'use client'

import { FormEvent, useRef, useState } from 'react'

import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import { useConfigDataStore } from '@/hooks/use-config-data-store'
import { useGenerateConfig } from '@/hooks/use-generate-config'
import { useGetToken } from '@/hooks/use-get-token'

import { Icons } from './icons'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'

export const ColorConversion = () => {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [variableName, setVariableName] = useState('')
  const { actions, state } = useConfigDataStore((state) => state)
  const { generateConfig } = useGenerateConfig()
  const handleGenerate = (e: FormEvent) => {
    e.preventDefault()
    if (!input) {
      showToast({
        heading: 'Color name is required!',
        body: '',
      })
      inputRef.current?.focus()
      return
    }
    const { data, error } = generateConfig(input, variableName)
    if (error) {
      showToast({
        heading: error.message,
        body: error.hint,
      })
      return
    }
    if (data) {
      actions.setConfigData(data)
    }
  }
  // TODO: If input starts from #, and is invalid hex code, directly throw an error
  return (
    <div
      className={cn(
        'flex h-full w-full  flex-col gap-2',
        !state.configData && 'mx-auto max-w-[350px]'
      )}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Enter Data</CardTitle>
          <CardDescription>
            Enter your color and variable name
          </CardDescription>{' '}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerate}>
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="variable_data">Color</Label>
                <Input
                  ref={inputRef}
                  id="variable_data"
                  value={input}
                  placeholder="#ecdafe"
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="variable_name">
                  Variable Name{' '}
                  <span className="text-sm text-muted-foreground">
                    (Optional)
                  </span>{' '}
                </Label>
                <Input
                  id="variable_name"
                  value={variableName}
                  placeholder="primary-color"
                  onChange={(e) => setVariableName(e.target.value)}
                />
              </div>{' '}
              <Button>
                <Icons.refreshCW className="mr-2 h-4 w-4 stroke-[1.5px]" />
                Generate
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
