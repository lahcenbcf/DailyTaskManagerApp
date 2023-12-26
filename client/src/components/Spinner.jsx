import React from 'react'

function Spinner() {
  return (
    <div className='z-10 bg-gradient absolute inset-0 flex justify-center items-center'>
    <span className="loading loading-spinner loading-md"></span>
    </div>
  )
}

export default Spinner
