import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
  action?: React.ReactNode
}

export function useToast() {
  return {
    toast: ({ title, description, variant, action }: ToastProps) => {
      if (variant === "destructive") {
        sonnerToast.error(title, {
          description,
          action: action as any,
        })
      } else if (variant === "success") {
        sonnerToast.success(title, {
          description,
          action: action as any,
        })
      } else {
        sonnerToast(title, {
          description,
          action: action as any,
        })
      }
    },
    dismiss: (toastId?: string | number) => sonnerToast.dismiss(toastId),
  }
}
