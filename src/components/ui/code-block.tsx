'use client'

import { useEffect, useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

import { Icons } from '../icons'

interface CodeBlockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}
export const CodeBlock = ({ data }: CodeBlockProps) => {
  const [_, copy] = useCopyToClipboard()
  const [copied, setCopied] = useState(false)
  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        setCopied(true)
        console.log('Copied!', { text })
      })
      .catch((error) => {
        setCopied(false)
        console.error('Failed to copy!', error)
      })
  }
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (copied) {
      timeout = setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [copied])
  return (
    <button
      onClick={copied ? () => {} : handleCopy(data)}
      className="group relative block max-h-[650px] w-fit overflow-x-auto rounded-lg border bg-zinc-950 py-3 pl-4 pr-16 text-start text-white dark:bg-zinc-900"
    >
      <pre className="text-sm">
        <code>{data}</code>
      </pre>
      {copied ? (
        <button className="absolute left-2 top-2 rounded-md bg-secondary p-1.5 md:left-auto md:right-2">
          <Icons.check className="h-[14px] w-[14px] stroke-[1px]" />
        </button>
      ) : (
        <button
          onClick={handleCopy(data)}
          className="invisible absolute left-2 top-2 rounded-md p-1.5 hover:bg-muted-foreground group-hover:visible dark:hover:bg-secondary md:left-auto md:right-2"
        >
          <Icons.copy className="h-[14px] w-[14px] stroke-[1px]" />
        </button>
      )}
    </button>
  )
}
