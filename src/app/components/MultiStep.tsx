interface IMultiStep {
  currentStep?: number
  size: number
}

export function MultiStep({ currentStep = 1, size }: IMultiStep) {
  function createRangeArrayByNumber(number: number) {
    return Array.from(Array(number).keys())
  }

  return (
    <div className="">
      <span className="text-zinc-200 text-xs">
        Passo {currentStep} de {size}
      </span>
      <ul className="flex gap-2">
        {Array.from(Array(size).keys()).map((item) => {
          if (item + 1 <= currentStep) {
            return (
              <li key={item} className="bg-zinc-50 h-1 rounded-xl w-full"></li>
            )
          } else {
            return (
              <li key={item} className="bg-zinc-400 h-1 rounded-xl w-full"></li>
            )
          }
        })}
      </ul>
    </div>
  )
}
