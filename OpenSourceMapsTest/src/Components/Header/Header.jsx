import React, { useContext, useEffect, useState } from 'react';
import { HiMoon, HiOutlineMagnifyingGlass, HiSun } from 'react-icons/hi2';
import poollogo from './../../assets/Images/poolcharacterlogo.png';

import { ThemeContext } from '../../Context/ThemeProvider';

function Header() {
	const { theme, setTheme } = useContext(ThemeContext);

	useEffect(() => {}, []);

	return (
		<div className='flex items-center p-0 flex-grow w-full'>
			<img
				src={poollogo}
				width={70}
				height={100}
				className='-my-2 opacity-75 md:block dark:invert'
			/>
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
