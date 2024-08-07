import React from 'react'

const Loader = () => {
  return (
        <div className='w-full h-full z-50 top-0 left-0 bg-slate-200 absolute flex justify-center items-center'>
            <div className="loader">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </div>
        

  )
}

export default Loader