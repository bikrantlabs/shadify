'use client'

import { useCallback, useState } from 'react'

import { useGetToken } from '@/hooks/use-get-token'

import { Button } from './ui/button'
import { Input } from './ui/input'

export const ColorConversion = () => {
  const [input, setInput] = useState('')
  const { getTokenData, tokenData, error } = useGetToken()

  const _getToken = useCallback(() => {
    getTokenData({ input })
  }, [input, getTokenData])
  return (
    <div className="flex flex-col gap-2">
      <Input value={input} onChange={(e) => setInput(e.target.value)} />
      <Button onClick={() => _getToken()}>Get</Button>
      {error && <p>{error.message}</p>}
      <pre>
        <code>HSL: {tokenData?.hsl} </code>
      </pre>
      <pre>
        <code>HEX: {tokenData?.hex} </code>
      </pre>
      <pre>
        <code>HSV: {tokenData?.hsv} </code>
      </pre>
      <pre>
        <code>RGB: {tokenData?.rgb} </code>
      </pre>
    </div>
  )
}
