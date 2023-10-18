import React from 'react';
import useFetchPoolTables from '../../Hooks/useFetchPoolTables';
import pool4 from '../../assets/Images/poolcharacter.png';
import './../../app.css';

function PopularPoolTableList() {
	const { poolTableList, loading } = useFetchPoolTables();

	return (
		<div className='mx-5'>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className='pt-60'>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7 opactiy-80'>
						{poolTableList.map((item) => (
							<div
								className='pb-14 bg-green-100 dark:bg-black p-4 rounded-lg h-full 
                hover:scale-110 transition-all duration-300 cursor-pointer opacity-60 hover:opacity-80'
								key={item.id}
							>
								<img
									src={pool4}
									width={240}
									height={60}
									className='hidden md:block dark:invert '
								/>
								<div>
									<h2 className='text-center text-[20px] dark:text-white font-bold'>
										{item.location_name}
										<div>
											<span className='text-center p-1 rounded-sm ml-2 text-[10px] bg-white text-green-700 font-medium'>
												{item.discounted_days}
											</span>
										</div>
									</h2>
									<div className='text-center'>
										<span className='p-1 rounded-sm ml-2 text-[10px] bg-white text-green-700 font-medium'>
											Number Of Tables:
											{item.num_of_pool_tables}
										</span>
									</div>
									<div className='text-center'>
										<span className='text-center p-1 rounded-sm ml-2 text-[10px] bg-white text-green-700 font-medium'>
											Rating:
											{item.rating}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default PopularPoolTableList;
