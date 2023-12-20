import React from 'react'

const StatusCheckbox = ({text, check}) => {
  return (
    <div className='flex mb-4'>
        <input onClick={e => check(e.target.checked)} type='checkbox' id={text} value={text} className='h-6 w-6'/>
        <label className='text-white font-medium ml-2 statusFilter' htmlFor={text}> 
            {text} 
        </label>
    </div>
  )
}

export default StatusCheckbox
