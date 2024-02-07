import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeWhitespaces(string: string) {
  return string.replace(/\s/g, '')
}

export function getValuesFromTokenString(inputString: string) {
  // Remove any non-numeric characters and split by comma
  const withoutWhitespaces = removeWhitespaces(inputString)
  const numberStrings = withoutWhitespaces.replace(/[^0-9%,°]/g, '').split(',')

  // Extract the degree sign from the first number
  const firstNumber = numberStrings[0].replace('°', '')

  // Convert the number strings to integers
  const outputArray = [parseInt(firstNumber, 10)]
    .concat(numberStrings.slice(1).map((num) => parseInt(num, 10)))
    .slice(0, 3)

  // Ensure the output array has exactly three numbers
  while (outputArray.length < 3) {
    outputArray.push(0) // Fill with zeros if there are less than three numbers
  }

  // Check if the input contains the degree sign at the end of the first number
  // const containsDegree =
  //   inputString.indexOf('°') > -1 &&
  //   inputString.indexOf('°') === inputString.lastIndexOf('°')

  return {
    tokenData: outputArray as [number, number, number],
  }
}

/**
 * Checks if the first number is concluded with a ° sign
 * E.g. (110°, 30, 50) or hsl(110°, 10, 20) etc.
 * Then user input might be a hsl depending on presence of a degree sign
 * @param string
 * @returns {boolean}
 */
export function checkHslDegree(string: string): boolean {
  const lastChar = string.split(',')[0].slice(-1)
  if (lastChar === '°') {
    return true
  } else {
    return false
  }
}
