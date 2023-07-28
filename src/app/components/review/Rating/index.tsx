'use client'

import { Review } from "@/@types"
import { useRating } from "@/app/hooks/useRating"
import { apiClient } from "@/lib/api"
import { Smiley, SmileyBlank, SmileySad } from "@phosphor-icons/react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Button } from "../../ui/button"

interface RatingProps {
  review: Review
}

export function Rating({ review }: RatingProps) {
  const session = useSession()
  const { filterRating } = useRating()
  const [ratings, setRatings] = useState(review.ratings)

  const [goodRatings, badRatings] = filterRating(ratings)

  async function handleAddBadRating() {
    if (session.status === 'authenticated') {
      const { data } = await apiClient.post(`/review/${review.id}/rating`, {
        type: "bad",
        userId: session.data.user.id
      })

      console.log(data.data)
      if (data.status === "success") {
        setRatings(state => [...state, data.data.rating])
      }
    }
  }

  async function handleAddGoodRating() {
    if (session.status === 'authenticated') {
      const { data } = await apiClient.post(`/review/${review.id}/rating`, {
        type: "good",
        userId: session.data.user.id
      })

      console.log(data.data)
      if (data.status === "success") {
        setRatings(state => [...state, data.data.rating])
      }
    }
  }
  return (
    <div className="space-x-2">
      <Button className="bg-green-500 hover:bg-green-600 text-zinc-50 space-x-1" onClick={handleAddGoodRating}>
        <span>Gostei</span> <Smiley size={20} weight="fill" />
      </Button>

      <Button className="bg-red-500 hover:bg-red-600 text-zinc-50 space-x-1" onClick={handleAddBadRating}>
        <span>Nao gostei</span> <SmileySad size={20} weight="fill" />
      </Button>
    </div>
  )
}