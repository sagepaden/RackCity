import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';


const libraries = ['places'];
function MapComponent() {
  const center = { lat: 45.5152, lng: -122.676483 };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  return (
    <div className='py-5 relative '>
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <div className='flex  h-[170px] md:h-[320px] w-full object-cover rounded-xl'>
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{
              width: '95%',
              height: '185%',
              borderRadius: '2rem',
            }}
            options={{
              streetViewControl: true,
              zoomControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <Marker position={center} />
          </GoogleMap>
        </div>
      )}
    </div>
  );
}

export default MapComponent;
