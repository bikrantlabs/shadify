import * as convert from 'color-convert'

export const useConversions = () => {
  function convertFromHex(string: string) {
    const rgb = convert.hex.rgb(string)
    const hsl = convert.hex.hsl(string)
    const hsv = convert.hex.hsv(string)
    return {
      rgb,
      hsl,
      hsv,
      hex: string.charAt(0) === '#' ? string : '#' + string,
    }
  }
  function convertFromRgb(numbers: [number, number, number]) {
    const hsl = convert.rgb.hsl(numbers)
    const hsv = convert.rgb.hsv(numbers)
    const hex = convert.rgb.hex(numbers)
    return {
      rgb: numbers,
      hsl,
      hsv,
      hex,
    }
  }
  function convertFromHsl(numbers: [number, number, number]) {
    const hsv = convert.hsl.hsv(numbers)
    const rgb = convert.hsl.rgb(numbers)
    const hex = convert.hsl.hex(numbers)
    return {
      rgb,
      hsl: numbers,
      hsv,
      hex,
    }
  }
  function convertFromHsv(numbers: [number, number, number]) {
    const hsl = convert.hsv.hsl(numbers)
    const rgb = convert.hsv.rgb(numbers)
    const hex = convert.hsv.hex(numbers)
    return {
      rgb,
      hsl,
      hsv: numbers,
      hex,
    }
  }
  return { convertFromHex, convertFromRgb, convertFromHsl, convertFromHsv }
}
