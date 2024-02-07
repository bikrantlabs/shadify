import { useGetToken } from './use-get-token'

export interface ConfigDataType {
  globalsCSS: {
    hslString: string
    rgbString?: string
    hsvString?: string
    hexString?: string
  }
  tailwindConfig: string
}
export const useGenerateConfig = () => {
  const { getTokenData } = useGetToken()

  //
  const generateConfig = (
    variableData: string,
    variableName: string = 'variableName'
  ): ConfigDataType | undefined => {
    const { data, error } = getTokenData({ input: variableData })
    if (error) {
      return
    }
    if (data) {
      const hsl = data.hsl
      const hslString = modifyToHsl(hsl)
      return {
        globalsCSS: {
          // !TODO: Generate --variableName-foreground: ; color also, add foreground color
          hslString: `--${variableName || 'variableName'}: ${hslString}`,
          rgbString: `rgb(${data.rgb.join(', ')})`,
          hexString: data.hex,
        },
        tailwindConfig: `"${variableName || 'variableName'}": {
        "DEFAULT": "hsl(var(--${variableName || 'variableName'}))",
},`,
      }
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
