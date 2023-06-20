import React from 'react'
import {MdLightMode, MdNightlight} from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'antd';
import { themeDark, themeLight, logout } from '../reducers/userauthSlice';
import {IoLogOutOutline} from "react-icons/io5";
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
    r.style.setProperty('--navbackgroundcolor', '#1A1A1A');
    r.style.setProperty('--bordercolor', '#fff');
    r.style.setProperty('--boxbackgroundcolor', '#333333');
  } else {
    r.style.setProperty('--backgroundcolor', '#fff');
    r.style.setProperty('--textcolor', '#000');  
    r.style.setProperty('--navbackgroundcolor', '#fff');
    r.style.setProperty('--bordercolor', '#000');
    r.style.setProperty('--boxbackgroundcolor', '#fff');
  }

  return (
    <div className='fixed w-full h-20 navbg px-4'>
      <div className="flex justify-between h-full w-full px-2 2xl:px-16 items-center">
        <h1 className='font-bold'>SocialTimes</h1>
        <div>
          <Search
            placeholder="search"
            // onSearch={onSearch}
            className='w-100 inputboxbg'
          />
        </div>
        <div className='flex justify-between'>
          <div className='cursor-pointer mr-2' onClick={changeTheme}>{theme ? <MdNightlight />  :  <MdLightMode /> }</div> 
          <IoLogOutOutline className='cursor-pointer' onClick={() => dispatch(logout())} />         
        </div>
      </div>
    </div>
  )
}

export default Navbar