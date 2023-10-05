import React, { useEffect, useState } from 'react';
import MapComponent from '../Components/MapComponent';
import PoolTableList from '../Components/PoolTableList';
// import SideNavGenreList from '../Componets/SideNavPoolList';
// import GlobalApi from '../Services.js/GlobalApi';
// import PopularPoolTableList from '../Componets/PopularPoolTableList';

function Home() {
  return (
    <div>
      <MapComponent />

      <PoolTableList />
    </div>
  );
}

export default Home
