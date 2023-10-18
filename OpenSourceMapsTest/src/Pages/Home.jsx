import React from 'react';
import PopularPoolTableList from '../Components/PoolTable/PopularPoolTableList';
import SideNavList from '../Components/SideNavList';
import LeafLetTest from '../Components/Map/LeafLetTest';
import Header from '../Components/Header';

function Home() {
	return (
		<div className='flex flex-col p-6 items-center'>
			<Header />
			<SideNavList />
			<div className='flex-grow flex-col justify-center'>
				<LeafLetTest />
				<PopularPoolTableList />
			</div>
		</div>
	);
}

export default Home;
