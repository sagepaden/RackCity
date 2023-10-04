import React, { useEffect, useState, useContext } from 'react';
import logo from './../assets/Images/logo.jpg';
import { HiOutlineMagnifyingGlassCircle, HiMoon, HiSun } from 'react-icons/hi2';
import { ThemeContext } from '../Context/ThemeContext';

function Header() {
  const [toggle, setToggle] = useState(true);
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    console.log('Theme', theme);
  }, []);
  return (
    <div className='flex items-center'>
      <img src={logo} width={60} height={60} />
      <div className='flex bg-slate-200 p-2 w-full mx-5 rounded-full items-center'>
        <HiOutlineMagnifyingGlassCircle />
        <input
          type='text'
          placeholder='Search For Tables'
          className='px-2 bg-transparent dark: bg-cyan-500 outline-none'
        />
      </div>
      <div>
        {theme == 'light' ? (
          <HiMoon
            onClick={() => setTheme('dark')}
            className='text-[35px] bg-slate-200, text-black p-1 rounded-full cursor-pointer'
          />
        ) : (
          <HiSun
            onClick={() => setTheme('light')}
            className='text-[35px] bg-slate-200, text-black p-1 rounded-full cursor-pointer'
          />
        )}
      </div>
    </div>
  );
}
export default Header;
