import { View, Text } from 'react-native';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import React, { useEffect } from 'react';
import * as Location from 'expo-location';

import { getDirections } from '~/services/directions';

const ScooterContext = createContext({});

const ScooterProvider = ({ children }: PropsWithChildren) => {
  const [selectedScooter, setSelectedScooter] = useState();
  const [direction, setDirection] = useState();

  useEffect(() => {
    const fetchDirections = async () => {
      const myLocation = await Location.getCurrentPositionAsync();
      console.log(myLocation);

      const newDirection = await getDirections(
        [myLocation.coords.longitude, myLocation.coords.latitude],
        [selectedScooter.long, selectedScooter.lat]
      );
      setDirection(newDirection);
    };

    if (selectedScooter) {
      fetchDirections();
    }
  }, [selectedScooter]);

  console.log('Selected: ', selectedScooter);

  return (
    <ScooterContext.Provider
      value={{
        selectedScooter,
        setSelectedScooter,
        direction,
        directionCoordinates: direction?.routes?.[0].geometry.coordinates,
        routeTime: direction?.routes?.[0].duration,
        routeDistance: direction?.routes?.[0]?.distance,
      }}>
      {children}
    </ScooterContext.Provider>
  );
};

export default ScooterProvider;

export const useScooter = () => useContext(ScooterContext);
