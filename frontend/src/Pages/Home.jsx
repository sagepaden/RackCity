import React, { useEffect, useState } from 'react';
import MapComponent from '../Components/MapComponent';
import AllPoolTableList from '../Components/AllPoolTableList';
import PopularPoolTableList from '../Components/PopularPoolTableList';
import SideNavList from '../Components/SideNavList';
// import SideNavGenreList from '../Componets/SideNavPoolList';
// import GlobalApi from '../Services.js/GlobalApi';

function Home() {
  return (
    <div className='grid grid-cols-4 p-6'>
      <div className='hidden md:flex '>
        <SideNavList />
      </div>
      <div className='md:col-span-3 col-span-4 px-3 '>
        <MapComponent />
        <PopularPoolTableList />
      </div>
    </div>
  );
}

export default Home;
