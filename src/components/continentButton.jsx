import React, { useState } from 'react'

const ContinentButton = ({text, filter}) => {

  //Add and remove selected effect to continent filters
  const selectContinent = (contientValue) => {
    const classReplacement = document.querySelector(`.${contientValue}`)

    if(!classReplacement.className.includes('text-white bg-lightgrey'))
    {
      classReplacement.classList.add('text-white', 'bg-lightgrey')
    } else{
      classReplacement.classList.remove('text-white', 'bg-lightgrey')
    }

    filter(contientValue)
  }


  return (
    <input value={text} type='button'
            onClick={ e => selectContinent(e.target.value)}
            className={`${text} font-semibold text-lightgrey py-2 px-3 rounded-xl my-1
                      transition-all duration-200 hover:text-white hover:bg-lightgrey`}
    />
  )
}

export default ContinentButton  
