import React from 'react'

const BigHeading: React.FC<{text: string}> = ( {text} ) => {
  return (
    <div className='text-[1.125rem] md:text-[1.5rem] font-bold tracking-[-0.25px] md:tracking-[-0.333px]'>{text}</div>
  )
}

export default BigHeading