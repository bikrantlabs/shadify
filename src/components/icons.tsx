import {
  Check,
  Command,
  Copy,
  Github,
  Moon,
  RefreshCw,
  SunMedium,
} from 'lucide-react'

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
  github: Github,
}

export const Icons: IconsType = icons
