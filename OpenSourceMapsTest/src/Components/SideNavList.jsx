import React, { useState } from 'react';
import pool1 from './../assets/Images/poologo.png';
import useFetchPoolTables from '../Hooks/useFetchPoolTables';

function SideNavList() {
	console.log('rendered');
	const { poolTableList, loading } = useFetchPoolTables();
	const [activeIndex, setActiveIndex] = useState(null);
	const [selectedPoolTableId, setSelectedPoolTableId] = useState(null);

	return (
		<div className='flex items-center px-1 pt-5'>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className='flex-grow flex flex-row space-x-4'>
					{poolTableList.map((item, index) => (
						<div
							key={item.id}
							className={`flex flex-col items-center cursor-pointer group transition-all duration-300 rounded-lg p-3 
              ${
					activeIndex === index
						? 'bg-slate-300 dark:bg-gray-700'
						: null
				}`}
							onClick={() => {
								setActiveIndex(index);
								setSelectedPoolTableId(item.id);
							}}
						>
							<img
								src={pool1}
								className={`dark:invert w-[40px] h-[40px] object-cover rounded-lg group-hover:scale-110 transition-all duration-300 ${
									activeIndex === index ? 'scale-110' : null
								}`}
							/>
							<h3
								className={`text-[12px] group-hover:font-bold dark:text-white transition-all duration-300 ${
									activeIndex === index ? 'font-bold' : null
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
