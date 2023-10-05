import React, { useState, useRef } from 'react'
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'


const libraries = ['places'];
function MapComponent() {

  // We will be using some state variables to store the response from the google maps api
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const sourceRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef()

  // We Have to select some coordinates to give to the map to initially show the map from that point.
  // This are the latitude and longitude of New Delhi, India
  const center = { lat: 28.7041, lng: 77.1025 }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries
  })




  // function to calculate Route
  async function calculateRoute() {
    event.preventDefault();
    if (sourceRef.current.value === '' || destinationRef.current.value === '') {
      return
    }
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: sourceRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    sourceRef.current.value = ''
    destinationRef.current.value = ''
  }


  if (!isLoaded)
    return <div>Loading...</div>


  return (
    <div className='relative '>
    <div className=' h-[170px] md:h-[320px] w-full object-cover rounded-xl'>
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '2rem' }}
            options={{
              streetViewControl: true,
              zoomControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {console.log(directionsResponse)}
            <Marker position={center} />
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          </GoogleMap>
      </div>
      </div>

  )

}

export default MapComponent
