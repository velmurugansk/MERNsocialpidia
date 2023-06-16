import React from 'react'
import {MdLightMode, MdNightlight} from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'antd';
import { modeset } from '../features/userauthSlice';
const { Search } = Input;


const Navbar = () => {
  const dispatch = useDispatch();
  
  const theme = useSelector((state) => state.user.isDarkmode);
  return (
    <div className='fixed w-full h-20 shadow-xl bg-white dark:bg-black'>
      <div className="flex justify-between h-full w-full px-2 2xl:px-16 items-center">
        <h1 className='font-bold'>SocialTimes</h1>
        <div>
          <Search
            placeholder="search"
            // onSearch={onSearch}
            className='w-100'
          />
        </div>
        <div className='flex'>
          {theme ? <MdLightMode onClick={dispatch(modeset(true))} />  :  <MdNightlight onClick={dispatch(modeset(false))} /> }          
        </div>
      </div>
    </div>
  )
}

export default Navbar