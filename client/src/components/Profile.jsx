import React from 'react'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../api/loginApi';
import {GrLocation} from 'react-icons/gr';
import {FaSuitcase} from 'react-icons/fa';

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
        <hr className='mt-1 mb-1'></hr>
        <div>
          <div className="flex items-center">
            <GrLocation /> <span className='space-x-4'>{userDetails.location}</span>
          </div>
          <div className="flex items-center">
            <FaSuitcase /> <span className='space-x-4'>{userDetails.occupation}</span>
          </div>          
        </div>
        <hr className='mt-1 mb-1'></hr>
        <div className='flex justify-between items-center'>
          <p className='text-sm'>who's viewed your profile</p>
          <span>{userDetails.viewedProfile}</span>
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-sm'>impression of your post</p>
          <span>{userDetails.impressions}</span>
        </div>
    </div>
  )
}

export default Profile