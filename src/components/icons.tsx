import { Check, Command, Copy, Moon, RefreshCw, SunMedium } from 'lucide-react'

export type IconKeys = keyof typeof icons

type IconsType = {
  [key in IconKeys]: React.ElementType
}

const icons = {
  logo: Command,
  sun: SunMedium,
  moon: Moon,
  copy: Copy,
  refreshCW: RefreshCw,
  check: Check,
}

export const Icons: IconsType = icons
