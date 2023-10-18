import React, { useState } from 'react';
import pool1 from './../assets/Images/poologo.png';
import useFetchPoolTables from '../Hooks/useFetchPoolTables';
import '../App.css';

function SideNavList() {
	const { poolTableList, loading } = useFetchPoolTables();
	const [activeItem, setActiveItem] = useState(null);

	return (
		<div className=''>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className='flex flex-row space-x-4'>
					{poolTableList.map((item) => (
						<div
							key={item.id}
							className={`flex flex-col items-center cursor-pointer group transition-all duration-300 rounded-lg p-3 
              ${activeItem === item ? 'bg-slate-300 dark:bg-gray-700' : ''}`}
							onClick={() => setActiveItem(item)}
						>
							<img
								src={pool1}
								className={`dark:invert w-[40px] h-[40px] object-cover rounded-lg group-hover:scale-110 transition-all duration-300 ${
									activeItem === item ? 'scale-110' : ''
								}`}
							/>
							<h3
								className={`text-[12px] group-hover:font-bold dark:text-white transition-all duration-300 ${
									activeItem === item ? 'font-bold' : ''
								}`}
							>
								{item.location_name}
							</h3>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default SideNavList;
