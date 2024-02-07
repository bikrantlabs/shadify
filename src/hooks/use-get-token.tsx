import { useState } from 'react'
import { HEX, HSL, HSV, RGB } from 'color-convert/conversions'

import { tokens, TokensType } from '@/types/tokens'
import {
  guessTokenType,
  isValidHexCode,
  isValidRgbCode,
} from '@/lib/conversions/validateTokens'
import { getValuesFromTokenString, removeWhitespaces } from '@/lib/utils'

import { useConversions } from './use-conversions'

export interface TokenData {
  hsl: HSL
  rgb: RGB
  hex: HEX
  hsv: HSV
}
interface ErrorType {
  message: string
  hint: string
}

type GetTokenDataReturnType = {
  data: TokenData | null
  error: ErrorType | null
}

export function useGetToken() {
  const [error, setError] = useState<ErrorType | undefined>()
  const [tokenData, setTokenData] = useState<TokenData | undefined>()
  const { convertFromHex, convertFromRgb, convertFromHsl, convertFromHsv } =
    useConversions()

  function getToken(string: string): TokensType {
    /**
     * Input: "rgb(1,1,1)" - Output: "rgb"
     * Input: "r   g b  (1,1,1)" - Output:"rgb"
     */
    const withoutWhitespaces = removeWhitespaces(string)

    const indexOfBrace = withoutWhitespaces.indexOf('(')
    const token = withoutWhitespaces.substring(0, indexOfBrace)

    return token.toLocaleLowerCase() as TokensType
  }

  function getTokenData({ input }: { input: string }): GetTokenDataReturnType {
    setError(undefined)
    setTokenData(undefined)
    const trimmedInput = removeWhitespaces(input)

    if (isValidHexCode(trimmedInput)) {
      const data = convertFromHex(trimmedInput)
      setTokenData(data)
      setError(undefined)
      return {
        data,
        error: null,
      }
    } else {
      let token = getToken(trimmedInput)
      const { tokenData } = getValuesFromTokenString(trimmedInput)
      if (token && !tokens.includes(token)) {
        setTokenData(undefined)
        setError({
          hint: 'Input should contain valid hsl, rgb, or hsv',
          message: 'Invalid token type',
        })
        return {
          error: {
            hint: 'Input should contain valid hsl, rgb, or hsv',
            message: 'Invalid token type',
          },
          data: null,
        }
      }
      if (!token) {
        // Either automatically guess token type or throw invalid input
        token = guessTokenType(trimmedInput)
      }
      if (token === 'rgb') {
        const isValidRgb = isValidRgbCode(tokenData)
        if (!isValidRgb) {
          setError({
            hint: 'Ensure all values in rgb are less than 255',
            message: 'Invalid RGB Code',
          })
          return {
            error: {
              hint: 'Ensure all values in rgb are less than 255',
              message: 'Invalid RGB Code',
            },
            data: null,
          }
        }
        const data = convertFromRgb(tokenData)
        setTokenData(data)
        return { data, error: null }
      } else if (token === 'hsl') {
        const data = convertFromHsl(tokenData)
        setTokenData(data)
        return { data, error: null }
      } else if (token === 'hsv') {
        const data = convertFromHsv(tokenData)
        setTokenData(data)
        return { data, error: null }
      }
    }
    return {
      error: {
        hint: 'Check your input and try again',
        message: 'Error converting',
      },
      data: null,
    }
  }
  return { tokenData, getTokenData, error, setTokenData }
}
