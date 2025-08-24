
interface StepTitleDescriptionProps {
  titleNormal: string
  titleGradient: string
  descriptions: string[]
}


export function StepTitleDescription({ titleNormal, titleGradient, descriptions}: StepTitleDescriptionProps) {
  return (
    <>
      <div className="space-y-3 py-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {titleNormal}
            <span className="leading-tight bg-gradient-to-tl from-lime-500 via-lime-600 to-green-700 bg-clip-text text-transparent ml-1">
            {titleGradient}
            </span>
          </h1>
          <div className="space-y-1 text-sm text-gray-600">
            {descriptions?.map((val, index)=>{
                return (<p key={index}>{val}</p>)
            })}
          </div>
        </div>
    </>
  )
}

