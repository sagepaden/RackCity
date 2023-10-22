import React, { useState } from 'react';
import useFetchPoolTables from '../../Hooks/useFetchPoolTables';
import pool4 from '../../assets/Images/poolcharacter.png';
import './../../app.css';

function PoolTableList() {
	const { poolTables, loading } = useFetchPoolTables();
	const [expandedCard, setExpandedCard] = useState(null);

	return (
		<div className='mx-3 w-full h-full'>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className='flex flex-wrap justify-center'>
					{poolTables.map((pT, index) => (
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
				  ${
						expandedCard === index
							? 'h-auto max-h-[300px] transition-all ease-in-out duration-600 '
							: 'h-auto max-h-[130px] transition-all ease-in-out duration-600'
					}
				  transition-all ease-in-out duration-600`}
							key={pT.id}
							onClick={() =>
								setExpandedCard(
									expandedCard === index ? null : index,
								)
							}
						>
							<div className='text-center flex flex-col items-center'>
								<h2 className='-mt-3 text-[14px] dark:text-white font-bold break-words'>
									{pT.location_name}
								</h2>
								<div className='w-[100px] h-[100px] flex-none'>
									<img
										src={pool4}
										className='block dark:invert object-cover'
									/>
								</div>
								<div className='-mt-7 text-[10px] text-black font-medium'>
									{pT.rating}
								</div>
								{expandedCard === index && (
									<div>
										<p className='text-[10px] text-black font-medium'>
											Discounted Days:{' '}
										</p>
										<p className='text-[10px] text-black font-medium'></p>
										<p className='text-[10px] text-black font-medium'>
											{pT.discounted_days}
										</p>
										<p className='text-[10px] text-black font-medium'>
											Number of Tables:{' '}
										</p>
										<p className='text-[10px] text-black font-medium'>
											{pT.num_of_pool_tables}
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
