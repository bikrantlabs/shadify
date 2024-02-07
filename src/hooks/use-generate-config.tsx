import { showToast } from '@/lib/toast'

import { ErrorType, useGetToken } from './use-get-token'

export interface ConfigDataType {
  globalsCSS: {
    hslString: string
    rgbString?: string
    hsvString?: string
    hexString?: string
  }
  tailwindConfig: string
}
interface GenerateConfigReturnType {
  data?: ConfigDataType
  error?: ErrorType
}
export const useGenerateConfig = () => {
  const { getTokenData } = useGetToken()

  //
  const generateConfig = (
    variableData: string,
    variableName: string = 'variableName'
  ): GenerateConfigReturnType => {
    const { data, error } = getTokenData({ input: variableData })
    if (error) {
      return { error }
    }
    if (data) {
      const hsl = data.hsl
      const hslString = modifyToHsl(hsl)
      return {
        data: {
          globalsCSS: {
            // !TODO: Generate --variableName-foreground: ; color also, add foreground color
            hslString: `--${variableName || 'variableName'}: ${hslString}`,
            rgbString: `rgb(${data.rgb.join(', ')})`,
            hexString: data.hex,
          },
          tailwindConfig: `"${variableName || 'variableName'}": {
        "DEFAULT": "hsl(var(--${variableName || 'variableName'}))",
},`,
        },
      }
    }
    return {
      error: {
        message: 'Unable to generate config',
        hint: 'Ensure all inputs are valid',
      },
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

  return { generateConfig }
}
