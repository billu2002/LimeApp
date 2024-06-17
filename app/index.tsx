import { Stack, Link } from 'expo-router';
import Map from '~/components/Map';
import { Text } from 'react-native';
import SelectedScooterSheet from '~/components/SelectedScooterSheet';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Map />
      <SelectedScooterSheet />
    </>
  );
}
