"use client"

import React, { useState, useCallback, useMemo } from 'react';
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'


// components/MapComponent.js
 // This directive is crucial for client-side components in Next.js App Router

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '80%',
  height: '500px'
};

const center = {
  lat: -3.745, // Default latitude
  lng: -38.523 // Default longitude
};

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_Maps_API_KEY,
    libraries: ['places'] // Include any additional libraries you need, e.g., 'places' for autocomplete
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is where you can get a reference to the map instance
    // You can use it to set bounds, add listeners, etc.
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // You can also use useMemo for static values to prevent re-renders
  const defaultCenter = useMemo(() => ({ lat: 37.7749, lng: -122.4194 }), []); // San Francisco example

  return isLoaded ? (
    <div className='flex justify-center items-center mx-4 my-4'>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter} // Use the default center or customize
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker position={defaultCenter} />
    </GoogleMap>
    </div>
  ) : (
    <div>Loading Map...</div> // Or a more sophisticated loader
  );
}

export default React.memo(MapComponent);

