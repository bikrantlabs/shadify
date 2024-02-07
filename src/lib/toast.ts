import { toast } from 'sonner'

interface ShowToastProps {
  heading: string
  body: string
  type?: 'success' | 'error'
}

export const showToast = ({ body, heading, type }: ShowToastProps) => {
  toast.message(heading, {
    description: body,
    classNames: {
      toast: '',
    },
  })
}
