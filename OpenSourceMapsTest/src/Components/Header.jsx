import React, { useContext, useEffect, useState } from 'react';

import poollogo from './../assets/Images/poologo.png';
import SideNavList from './SideNavList';
import {
  HiMoon,
  HiOutlineBars3CenterLeft,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiSun,
} from 'react-icons/hi2';
import { ThemeContext } from '../Context/ThemeProvider';


function Header() {
  const [toggle, setToggle] = useState(true);
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    console.log('THEME--', theme);
  }, []);

  return (
    <div className='flex items-center p-4'>
      <img src={poollogo} width={60} height={60} className='hidden md:block dark:invert' />
      <div className='md:hidden'>
        {!toggle ? (
          <HiOutlineBars3CenterLeft
            onClick={() => setToggle(!toggle)}
            className='dark:text-white text-[25px] cursor-pointer'
          />
        ) : (
          <HiOutlineXMark
            onClick={() => setToggle(!toggle)}
            className='dark:text-white text-[25px] cursor-pointer'
          />
        )}
        {toggle ? (
          <div className='absolute z-10 bg-white  mt-3 dark:bg-[#121212]'>
            <SideNavList />
          </div>
        ) : null}
      </div>
      <div className='flex bg-slate-200 mx-5 w-full p-2 rounded-full items-center px-2 opacity-60'>
        <HiOutlineMagnifyingGlass />
        <input
          type='text'
          placeholder='Search Pool Tables'
          className='bg-transparent w-full outline-none pl-2 items-center rounded-full'
        />
      </div>
      <div>
        {theme == 'dark' ? (
          <HiSun
            className='text-[40px] cursor-pointer
       bg-gray-200 text-black p-1 rounded-full opacity-60'
            onClick={() => setTheme('light')}
          />
        ) : (
          <HiMoon
            className='text-[40px] cursor-pointer bg-gray-200 text-black p-1 rounded-full opacity-60'
            onClick={() => setTheme('dark')}
          />
        )}
      </div>
    </div>
  );
}

export default Header;
