import React from 'react'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../api/loginApi';

const Profile = () => {

  const userDetails = useSelector((state) => state.user.user);
   
  return (
    <div className='rounded -w-full p-2'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <img src={`${BASE_URL}/uploads/${userDetails.picturePath}`} className='rounded-full' width="60" height="60" alt="profilepic" />
            <p className='ml-2 font-bold uppercase'>{userDetails.firstName +' '+ userDetails.lastName}</p>
          </div>
        </div>
    </div>
  )
}

export default Profile