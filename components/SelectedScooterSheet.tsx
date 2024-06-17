import { View, Text, Image } from 'react-native';
import React, { useEffect, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useScooter } from '~/providers/ScooterProvider';
import scooterImage from '~/assets/scooter.png';
import { FontAwesome6 } from '@expo/vector-icons';
import { Button } from './Button';

const SelectedScooterSheet = () => {
  const { selectedScooter, duration, distance, isNearby } = useScooter();
  // console.log(selectedScooter?.id);
  const BottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (selectedScooter) {
      BottomSheetRef.current?.expand();
    }
  }, [selectedScooter]);

  return (
    <BottomSheet
      ref={BottomSheetRef}
      index={-1}
      snapPoints={[200]}
      backgroundStyle={{ backgroundColor: '#414442' }}
      //   enableDynamicSizing={true}
      enablePanDownToClose>
      {selectedScooter && (
        <BottomSheetView style={{ flex: 1, padding: 10, gap: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Image source={scooterImage} style={{ width: 60, height: 60 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '400' }}>Lime - S</Text>
              <Text style={{ color: 'gray', fontSize: 14 }}>
                id-{selectedScooter.id} · Madison Avenue
              </Text>
            </View>
            <View style={{ gap: 5 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  alignSelf: 'flex-start',
                }}>
                <FontAwesome6 name="flag-checkered" size={18} color="#42E100" />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
                  {(distance / 1000).toFixed(1)} km
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  alignSelf: 'flex-start',
                }}>
                <FontAwesome6 name="clock" size={18} color="#42E100" />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
                  {(duration / 60).toFixed(1)} min
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Button title="Start journey" disabled={!isNearby} />
          </View>
        </BottomSheetView>
      )}
    </BottomSheet>
  );
};

export default SelectedScooterSheet;
