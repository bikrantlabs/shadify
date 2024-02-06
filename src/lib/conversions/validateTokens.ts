import { TokensType } from '@/types/tokens'

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
  // Regular expression to match valid hex color codes with optional starting "#"
  const withoutWhitespaces = removeWhitespaces(hexCode)
  const hexRegex = /^#?([0-9a-fA-F]{3}){1,2}$/

  // Check if the input matches the regex
  return hexRegex.test(withoutWhitespaces)
}

export function guessTokenType(input: string): TokensType {
  const withoutWhitespaces = removeWhitespaces(input)

  const { tokenData } = getValuesFromTokenString(withoutWhitespaces)

  const containsDegree = checkHslDegree(withoutWhitespaces)
  if (!containsDegree && isValidRgbCode(tokenData)) {
    return 'rgb'
  }
  return 'hsl'
}
