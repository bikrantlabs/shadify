import { TokensType } from '@/types/tokens'
import { ErrorType } from '@/hooks/use-get-token'

import {
  checkHslDegree,
  getValuesFromTokenString,
  removeWhitespaces,
} from '../utils'

export type TokenDataArray = [number, number, number]
/**
 * Checks if every number in array is less than or equals to 255 to be valid rgb
 * @param tokenData
 * @returns {boolean}
 */
export function isValidRgbCode(tokenData: TokenDataArray): boolean {
  return tokenData.every((number) => number <= 255)
}
/**
 * Checks if first number is less than or equals to 360, second and third numbers
 * are less than or equals to 100.
 * @param tokenData
 * @returns {boolean}
 */
export function isValidHslCode(tokenData: TokenDataArray): boolean {
  if (tokenData[0] <= 360 && tokenData[1] <= 100 && tokenData[2] <= 100)
    return true
  return false
}

// Function to check hex code:
export function isValidHexCode(hexCode: string) {
  const withoutWhitespaces = removeWhitespaces(hexCode)

  // Regular expression to match valid hex color codes with optional starting "#"
  const hexRegex = /^#?([0-9a-fA-F]{3}){1,2}$/

  // Check if the input matches the regex
  return hexRegex.test(withoutWhitespaces)
}

export function hexStartsFromHashtag(hexCode: string) {
  const withoutWhitespaces = removeWhitespaces(hexCode)
  if (withoutWhitespaces.charAt(0) === '#') return true
  return false
}
export function guessTokenType(input: string): TokensType | null {
  /**
   * Input is expected to be (123,123,124) or (125°,100%,100%)
   */
  const withoutWhitespaces = removeWhitespaces(input)

  const { tokenData } = getValuesFromTokenString(withoutWhitespaces)

  const containsDegree = checkHslDegree(withoutWhitespaces)
  const validRgb = isValidRgbCode(tokenData)
  const validHsl = isValidHslCode(tokenData)
  if (!containsDegree && validRgb) {
    return 'rgb'
  }
  if (!validRgb && validHsl) {
    return 'hsl'
  }
  if (containsDegree) {
    if (validHsl) return 'hsl'
    else return null
  } else {
    if (validHsl) return 'hsl'
    else return null
  }
}

type GetValidatedTokenReturnType = {
  token?: TokensType
  error?: ErrorType
}
export function getValidatedToken(string: string): GetValidatedTokenReturnType {
  /**
   * Input: "rgb(1,1,1)" - Output: "rgb"
   * Input: "r   g b  (1,1,1)" - Output:"rgb"
   */

  /**
   * First check characters till small brackets (
   */
  const withoutWhitespaces = removeWhitespaces(string)

  const indexOfBrace = withoutWhitespaces.indexOf('(')
  let token: TokensType | null = withoutWhitespaces
    .substring(0, indexOfBrace)
    .toLowerCase() as TokensType
  if (!token) {
    token = guessTokenType(withoutWhitespaces)
  }
  if (!token) return {}
  if (token) {
    const { tokenData } = getValuesFromTokenString(withoutWhitespaces)

    if (token === 'rgb') {
      if (isValidRgbCode(tokenData))
        return {
          token: 'rgb',
        }
      else
        return {
          error: {
            message: 'Invalid RGB Code',
            hint: 'Ensure all numbers are <=255, each separated by a comma.',
          },
        }
    }

    if (token === 'hsl') {
      if (isValidHslCode(tokenData))
        return {
          token: 'hsl',
        }
      else
        return {
          error: {
            message: 'Invalid HSL Code',
            hint: 'Ensure hue <= 360, saturation <= 100, lightness <=100',
          },
        }
    }

    if (token === 'hsv') {
      if (isValidHslCode(tokenData))
        return {
          token: 'hsv',
        }
      else
        return {
          error: {
            message: 'Invalid HSV Code',
            hint: 'Ensure hue <= 360, saturation <= 100, lightness <=100',
          },
        }
    }
  }

  return {}
}
