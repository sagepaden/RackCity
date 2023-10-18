import React from 'react';
import PopularPoolTableList from '../Components/PoolTable/PoolTableList';
import SideNavList from '../Components/Header/HeaderNav';
import LeafLetTest from '../Components/Map/Map';
import Header from '../Components/Header/Header';

function Home() {
	return (
		<div className='flex flex-col p-5 items-center'>
			<div className='w-full'>
				<Header />
			</div>
			<div>
				<SideNavList />
			</div>
			<div className='flex-grow w-full'>
				<LeafLetTest />
			</div>
			<div className='flex-grow'>
				<PopularPoolTableList />
			</div>
		</div>
	);
}

export default Home;
