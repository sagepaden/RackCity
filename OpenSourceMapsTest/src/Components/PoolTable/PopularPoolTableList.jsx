import React from 'react';
import useFetchPoolTables from '../../Hooks/useFetchPoolTables';
import pool4 from '../../assets/Images/poolcharacter.png';
import './../../app.css';

function PopularPoolTableList() {
	const { poolTableList, loading } = useFetchPoolTables();

	return (
		<div className='mx-3 '>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div>
					<div
						className='grid grid-cols-1 gap-6 opacity-80
							sm:grid-cols-2 
							md:grid-cols-3
							lg:grid-cols-4
							xl:grid-cols-5
							2xl:grid-cols-6'
					>
						{poolTableList.map((item) => (
							<div
								className='
								h-[150px] w-[150px] 
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
								cursor-pointer'
								key={item.id}
							>
								<img
									src={pool4}
									width={140}
									height={100}
									className='block dark:invert'
								/>
								<div className='text-center'>
									<h2 className='text-[16px] dark:text-white font-bold'>
										{item.location_name}
									</h2>
									<div className='text-center rounded-sm ml-2 text-[10px] text-black font-medium'>
										<p>Rating:</p>
										{item.rating}
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
