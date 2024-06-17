import React, { useEffect, useState } from 'react';
import Mapbox, { Camera, MapView, LocationPuck } from '@rnmapbox/maps';
import * as Location from 'expo-location';

import { useScooter } from '~/providers/ScooterProvider';
import LineRoute from './LineRoute';
import ScooterMarkers from './ScooterMarkers';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const Map = () => {
  type LocationType = Location.LocationObject | null;
  const [location, setLocation] = useState<LocationType>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { directionCoordinates } = useScooter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera followZoomLevel={14} followUserLocation />
      <LocationPuck
        visible={true}
        puckBearingEnabled
        puckBearing="heading"
        pulsing={{ isEnabled: true }}
      />
      <ScooterMarkers />

      {directionCoordinates && <LineRoute coordinates={directionCoordinates} />}
    </MapView>
  );
};

export default Map;
