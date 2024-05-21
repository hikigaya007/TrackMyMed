import React from 'react'

function Navbar() {
  return (
    <div className='h-[70px] bg-green-500 flex justify-between items-center p-4 border-b border-b-black'>
        <div className='font-bold text-2xl'>
            TrackMyMed
        </div>
        <div>
            userProfile
        </div>
    </div>
  )
}

export default Navbar