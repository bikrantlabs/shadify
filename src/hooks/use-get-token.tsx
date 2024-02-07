import { useState } from 'react'
import { HEX, HSL, HSV, RGB } from 'color-convert/conversions'

import { tokens } from '@/types/tokens'
import {
  getValidatedToken,
  isValidHexCode,
} from '@/lib/conversions/validateTokens'
import { showToast } from '@/lib/toast'
import { getValuesFromTokenString, removeWhitespaces } from '@/lib/utils'

import { useConversions } from './use-conversions'

export interface TokenData {
  hsl: HSL
  rgb: RGB
  hex: HEX
  hsv: HSV
}
export interface ErrorType {
  message: string
  hint: string
}

export type GetTokenDataReturnType = {
  data: TokenData | null
  error: ErrorType | null
}

export function useGetToken() {
  const [error, setError] = useState<ErrorType | undefined>()
  const [tokenData, setTokenData] = useState<TokenData | undefined>()
  const { convertFromHex, convertFromRgb, convertFromHsl, convertFromHsv } =
    useConversions()

  function getTokenData({ input }: { input: string }): GetTokenDataReturnType {
    setError(undefined)
    setTokenData(undefined)
    const trimmedInput = removeWhitespaces(input)

    const { token, error } = getValidatedToken(trimmedInput)
    if (error) {
      return {
        data: null,
        error,
      }
    }
    if (token && !tokens.includes(token)) {
      return {
        error: {
          hint: 'Input should contain valid hsl, rgb, or hsv',
          message: 'Invalid token type',
        },
        data: null,
      }
    }
    if (token) {
      const { tokenData } = getValuesFromTokenString(trimmedInput)
      if (token === 'rgb') {
        showToast({
          heading: 'Detected RGB',
          body: 'Generated config from rgb!',
        })
        const data = convertFromRgb(tokenData)
        return { data, error: null }
      }
      if (token === 'hsl') {
        showToast({
          heading: 'Detected HSL',
          body: 'Generated config from hsl!',
        })
        const data = convertFromHsl(tokenData)
        return { data, error: null }
      }
      if (token === 'hsv') {
        showToast({
          heading: 'Detected HSV',
          body: 'Generated config from hsv!',
        })
        const data = convertFromHsv(tokenData)
        return { data, error: null }
      }
    }

    if (!token) {
      if (isValidHexCode(trimmedInput)) {
        // Valid Hex
        showToast({
          heading: 'Detected HEX',
          body: 'Generated config from hex!',
        })
        const data = convertFromHex(trimmedInput)
        return {
          data,
          error: null,
        }
      }
    }
    return {
      error: {
        hint: 'Please ensure your input data is correct',
        message: 'Invalid color input',
      },
      data: null,
    }
  }
  return { tokenData, getTokenData, error, setTokenData }
}
