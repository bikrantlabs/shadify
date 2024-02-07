'use client'

import { FormEvent, useState } from 'react'

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
  const [variableName, setVariableName] = useState('')
  const { actions } = useConfigDataStore((state) => state)
  const { generateConfig } = useGenerateConfig()
  const handleGenerate = (e: FormEvent) => {
    e.preventDefault()
    const data = generateConfig(input, variableName)
    console.log('Generated Config...', data)
    if (data) {
      actions.setConfigData(data)
    } else {
      alert('Invalid Input!')
    }
  }
  // TODO: If input starts from #, and is invalid hex code, directly throw an error
  return (
    <div className="flex w-full max-w-[350px] flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle>Enter Data</CardTitle>
          <CardDescription>
            Paste your color and generate required variables
          </CardDescription>
          <CardContent className="p-0">
            <form onSubmit={handleGenerate}>
              <div className="flex w-full flex-col gap-4">
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="variable_data">Color</Label>
                  <Input
                    id="variable_data"
                    value={input}
                    placeholder="#ecdafe"
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="variable_name">Variable Name</Label>
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
        </CardHeader>
      </Card>
    </div>
  )
}
