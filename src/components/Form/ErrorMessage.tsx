import { FormMessage } from "../ui/form";

interface ErrorMessageProps {
  message: string | undefined;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p
      className={'text-sm font-medium text-red-600'}
    >
      { message }
    </p>
  )
}