// 'use client'

interface ReviewProps {
  params: {
    id: string
  }
}

export default function Review({params}: ReviewProps) {

  return (
    <h1>{params.id}</h1>
  )
}