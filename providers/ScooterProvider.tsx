import getDistance from '@turf/distance';
import { point } from '@turf/helpers';
import * as Location from 'expo-location';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { getDirections } from '~/services/directions';

type Scooter = {
  id: string;
  long: number;
  lat: number;
};

type Direction = {
  routes: {
    geometry: {
      coordinates: [number, number][];
    };
    duration: number;
    distance: number;
  }[];
} | null;

type ScooterContextType = {
  selectedScooter: Scooter | undefined;
  setSelectedScooter: (scooter: Scooter | undefined) => void;
  direction: Direction;
  directionCoordinates: [number, number][] | undefined;
  duration: number | undefined;
  distance: number | undefined;
  isNearby: boolean;
};

const ScooterContext = createContext<ScooterContextType | undefined>(undefined);

export default function ScooterProvider({ children }: PropsWithChildren) {
  const [selectedScooter, setSelectedScooter] = useState<Scooter | undefined>(undefined);
  const [direction, setDirection] = useState<Direction>(null);
  const [isNearby, setIsNearby] = useState(false);

  useEffect(() => {
    let subscription: Location.LocationSubscription | undefined;

    const watchLocation = async () => {
      subscription = await Location.watchPositionAsync({ distanceInterval: 10 }, (newLocation) => {
        if (!selectedScooter) return;
        const from = point([newLocation.coords.longitude, newLocation.coords.latitude]);
        const to = point([selectedScooter.long, selectedScooter.lat]);
        const distance = getDistance(from, to, { units: 'meters' });
        if (distance < 100) {
          setIsNearby(true);
        }
      });
    };

    if (selectedScooter) {
      watchLocation();
    }

    return () => {
      subscription?.remove();
    };
  }, [selectedScooter]);

  useEffect(() => {
    const fetchDirections = async () => {
      if (!selectedScooter) return;
      const myLocation = await Location.getCurrentPositionAsync();
      const newDirection = await getDirections(
        [myLocation.coords.longitude, myLocation.coords.latitude],
        [selectedScooter.long, selectedScooter.lat]
      );
      setDirection(newDirection);
    };

    if (selectedScooter) {
      fetchDirections();
      setIsNearby(false);
    }
  }, [selectedScooter]);

  return (
    <ScooterContext.Provider
      value={{
        selectedScooter,
        setSelectedScooter,
        direction,
        directionCoordinates: direction?.routes?.[0]?.geometry?.coordinates,
        duration: direction?.routes?.[0]?.duration,
        distance: direction?.routes?.[0]?.distance,
        isNearby,
      }}>
      {children}
    </ScooterContext.Provider>
  );
}

export const useScooter = () => {
  const context = useContext(ScooterContext);
  if (!context) {
    throw new Error('useScooter must be used within a ScooterProvider');
  }
  return context;
};
