import { Metadata } from 'next'
import { FormCreateReview } from './form'

export const metadata: Metadata = {
  title: 'Criar Review | DeepReview',
  description: 'Crie um review para que outros possam analisar',
}

export default function CreateReview() {
  return (
    <div className="flex container mx-auto min-h-full flex-col justify-center items-center py-12 gap-4">
      <FormCreateReview />
    </div>
  )
}
