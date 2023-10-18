import React from 'react';
import PopularPoolTableList from '../Components/PoolTable/PopularPoolTableList';
import SideNavList from '../Components/SideNavList';
import LeafLetTest from '../Components/Map/LeafLetTest';
import Header from '../Components/Header';

function Home() {
	return (
		<div className='flex flex-col p-2 items-center'>
			<div className='w-full'>
				<Header />
			</div>
			<div>
				<SideNavList />
			</div>
			<div className='flex-grow w-full'>
				<LeafLetTest />
			</div>
			<div className=''>
				<PopularPoolTableList />
			</div>
		</div>
	);
}

export default Home;
