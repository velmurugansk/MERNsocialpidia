import React from 'react'
import Profile from './Profile';

const Maincontent = () => {
  return (
    <div className='grid grid-cols-5 gap-4 mt-24 px-20'>
        <div className="col-span-1">
            <Profile />
        </div>
        <div className="col-span-3">
            <p>Hai</p>
        </div>
        <div className="col-span-1">
            <p>Hai</p>
        </div>
    </div>
  )
}

export default Maincontent;