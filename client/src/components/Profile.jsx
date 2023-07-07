import React from 'react'
import { useSelector } from 'react-redux';
import { BASE_URL } from '../api/loginApi';
import {GrLocation} from 'react-icons/gr';
import {FaSuitcase} from 'react-icons/fa';
import {BsTwitter, BsLinkedin,BsPencil} from 'react-icons/bs';

const Profile = () => {

  const userDetails = useSelector((state) => state.user.user);
   
  return (
    <div className='rounded-lg -w-full p-4 bg-slate-300'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <img src={`${BASE_URL}/uploads/${userDetails.picturePath}`} className='rounded-full' width="60" height="60" alt="profilepic" />
            <p className='ml-2 font-bold uppercase'>{userDetails.firstName +' '+ userDetails.lastName}</p>
          </div>
        </div>
        <hr className='mt-2 mb-1'></hr>
        <div>
          <div className="flex items-center">
            <GrLocation /> <span className='ml-2'>{userDetails.location}</span>
          </div>
          <div className="flex items-center mt-1">
            <FaSuitcase /> <span className='ml-2'>{userDetails.occupation}</span>
          </div>          
        </div>
        <hr className='mt-2 mb-1'></hr>
        <div className='flex justify-between items-center'>
          <p className='text-sm'>who's viewed your profile</p>
          <span>{userDetails.viewedProfile}</span>
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-sm'>impression of your post</p>
          <span>{userDetails.impressions}</span>
        </div>
        <hr className='mt-1 mb-1'></hr>
        <div>
          <h5>Social Profiles</h5>
          <div className="flex justify-between items-center mt-1">
            <div className='flex items-center'>
              <div>
              <BsTwitter className='text-lg' />
              </div>
              <div className='ml-2'> 
              <p >{userDetails.location}</p><p className='text-sm'>hello</p>
              </div>               
            </div>
            <BsPencil />
          </div>
          <div className="flex justify-between items-center mt-1">
            <div className='flex items-center'>
              <div>
              <BsLinkedin className='text-lg' />
              </div>
              <div className='ml-2'> 
              <p>{userDetails.location}</p><p className='text-sm'>hello</p>
              </div>               
            </div>
            <BsPencil />
          </div>
        </div>
    </div>
  )
}

export default Profile