import { TokenData } from '../../hooks/use-get-token'

export interface ConfigDataType {
  globalsCSS: {
    hslString: string
    rgbString?: string
    hsvString?: string
    hexString?: string
  }
  tailwindConfig: string
}
export const generateConfig = (
  variableName: string = 'variableName',
  tokenData: TokenData
): ConfigDataType => {
  const hsl = tokenData.hsl
  const hslString = modifyToHsl(hsl)
  return {
    globalsCSS: {
      hslString: `--${variableName || 'variableName'}: ${hslString}`,
      rgbString: `rgb(${tokenData.rgb.join(', ')})`,
      hexString: tokenData.hex,
    },
    tailwindConfig: `${variableName || 'variableName'}: {
    "DEFAULT": "hsl(var(--${variableName || 'variableName'}))",
},
`,
  }
}

const modifyToHsl = (inputArray: number[]) => {
  const modifiedArray = inputArray.map((value, index) => {
    if (index === 1 || index === inputArray.length - 1) {
      // Add % sign to second and last element
      return value + '%'
    } else {
      return value.toString() // Convert other elements to strings
    }
  })

  return modifiedArray.join(' ') + ';'
}
