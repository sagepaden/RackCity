import React, { useEffect, useState } from 'react';
import MapComponent from '../Components/MapComponent';
import AllPoolTableList from '../Components/AllPoolTableList';
import PopularPoolTableList from '../Components/PopularPoolTableList';
// import SideNavGenreList from '../Componets/SideNavPoolList';
// import GlobalApi from '../Services.js/GlobalApi';


function Home() {
  return (
    <div>
      <MapComponent />

   <PopularPoolTableList />
    </div>
  );
}

export default Home;
