import React, { useState } from 'react'
import {MdLightMode, MdNightlight} from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'antd';
import { themeDark, themeLight } from '../features/userauthSlice';
const { Search } = Input;


const Navbar = () => {
  const dispatch = useDispatch();    
  const r = document.querySelector(':root');
  const theme = useSelector((state) => state.user.isDarkmode);

  const changeTheme = () => {
    if(theme) {
      dispatch(themeLight());      
    } else {      
      dispatch(themeDark());
    }  
  }
  
  if(theme) {
    r.style.setProperty('--backgroundcolor', '#000');
    r.style.setProperty('--textcolor', '#fff');
  } else {
    r.style.setProperty('--backgroundcolor', '#fff');
    r.style.setProperty('--textcolor', '#000');  
  }

  return (
    <div className='fixed w-full h-20 shadow-xl'>
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
          <div className='cursor-pointer' onClick={changeTheme}>{theme ? <MdNightlight />  :  <MdLightMode /> }</div>          
        </div>
      </div>
    </div>
  )
}

export default Navbar