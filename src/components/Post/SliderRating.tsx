import { ThumbsDown, ThumbsUp } from '@phosphor-icons/react'
import * as SliderPrimitive from '@radix-ui/react-slider'

export function SliderRating() {
  return (
    <div className="flex items-center gap-2">
      <ThumbsUp width={24} weight="bold" />

      <SliderPrimitive.Root
        value={[50]}
        className="relative flex w-full touch-none select-none items-center"
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-red-500">
          <SliderPrimitive.Range className="absolute h-full bg-green-500" />
        </SliderPrimitive.Track>
      </SliderPrimitive.Root>

      <ThumbsDown width={24} weight="bold" />
    </div>
  )
}
