import { View, Text, Image } from 'react-native';
import React, { useEffect, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useScooter } from '~/providers/ScooterProvider';
import scooterImage from '~/assets/scooter.png';
import { FontAwesome6 } from '@expo/vector-icons';

const SelectedScooterSheet = () => {
  const { selectedScooter, duration, distance } = useScooter();
  //   console.log(selectedScooter.id);
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
      <BottomSheetView style={{ flex: 1, padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Image source={scooterImage} style={{ width: 60, height: 60 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '400' }}>Lime - S</Text>
            <Text style={{ color: 'gray', fontSize: 14 }}>
              id-{selectedScooter.id} · Madison Avenue
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start' }}>
            <FontAwesome6 name="bolt-lightning" size={24} color="#42E100" />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>12km</Text>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default SelectedScooterSheet;
