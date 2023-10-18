import React, { useState } from 'react';
import useFetchPoolTables from '../../Hooks/useFetchPoolTables';
import pool4 from '../../assets/Images/poolcharacter.png';
import './../../app.css';

function PoolTableList() {
	const { poolTableList, loading } = useFetchPoolTables();
	const [expandedCard, setExpandedCard] = useState(null);

	return (
		<div className='mx-3 w-full h-full'>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className='flex flex-wrap justify-center'>
					{poolTableList.map((item, index) => (
						<div
							className={`m-2
				  h-[130px] w-[130px] 
				  flex flex-col 
				  items-center 
				  bg-green-100 
				  p-4 rounded-lg 
				  opacity-60
				  hover:scale-110 
				  hover:opacity-80 
				  dark:bg-black 
				  transition-all 
				  duration-300 
				  cursor-pointer 
				  ${expandedCard === index ? 'h-auto max-h-[300px]' : 'h-auto max-h-[160px]'}
				  transition-all ease-in-out duration-400`}
							key={item.id}
							onClick={() =>
								setExpandedCard(
									expandedCard === index ? null : index,
								)
							}
						>
							<div className='text-center overflow-hidden transition-all ease-in-out duration-600 flex flex-col items-center'>
								<h2 className='text-[14px] dark:text-white font-bold break-words'>
									{item.location_name}
								</h2>
								<div className='w-[140px] h-[100px] flex-none'>
									<img
										src={pool4}
										className='block dark:invert w-full h-full object-cover'
									/>
								</div>
								<div className='-mt-4 rounded-sm text-[10px] text-black font-medium'>
									{item.rating}
								</div>
								{expandedCard === index && (
									<div className=''>
										<p className='text-[10px] text-black font-medium'>
											Discounted Days:{' '}
										</p>
										<p className='text-[10px] text-black font-medium'></p>
										<p className='text-[10px] text-black font-medium'>
											{item.discounted_days}
										</p>
										<p className='text-[10px] text-black font-medium'>
											Number of Tables:{' '}
										</p>
										<p className='text-[10px] text-black font-medium'>
											{item.num_of_pool_tables}
										</p>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default PoolTableList;
