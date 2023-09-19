import { Rating } from '@/@types'
import { ThumbsDown, ThumbsUp } from '@phosphor-icons/react'
import * as SliderPrimitive from '@radix-ui/react-slider'

interface SliderRatingProps {
  ratings: Rating[]
}

export function SliderRating({ ratings }: SliderRatingProps) {
  const filterRating = () => {
    const good = ratings.filter((rating) => rating.type === 'good')
    const bad = ratings.filter((rating) => rating.type === 'bad')

    return [good, bad]
  }

  const [goodRating, badRatings] = filterRating()

  const ratingsPercentage = (100 * goodRating.length) / ratings.length

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <ThumbsUp width={24} weight="bold" />
        {goodRating.length}
      </div>

      <SliderPrimitive.Root
        value={[ratingsPercentage]}
        className="relative flex w-full touch-none select-none items-center"
      >
        <SliderPrimitive.Track
          className={`relative h-1 w-full grow overflow-hidden rounded-full ${
            ratingsPercentage > 0 || badRatings.length > 0
              ? 'bg-red-500'
              : 'bg-zinc-100'
          }`}
        >
          <SliderPrimitive.Range className="absolute h-full bg-green-500" />
        </SliderPrimitive.Track>
      </SliderPrimitive.Root>

      <div className="flex items-center">
        <ThumbsDown width={24} weight="bold" />
        {badRatings.length}
      </div>
    </div>
  )
}
