import { View, Text } from 'react-native';
import React from 'react';
import { ShapeSource, LineLayer } from '@rnmapbox/maps';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';

const LineRoute = ({ coordinates }: { coordinates: Position[] }) => {
  return (
    <ShapeSource
      id="routeSource"
      lineMetrics
      shape={{
        properties: {},
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: coordinates,
        },
      }}>
      <LineLayer
        id="exampleLineLayer"
        style={{
          lineColor: '#42E100',
          lineCap: 'round',
          lineJoin: 'round',
          lineWidth: 7,
          // lineDasharray: [6, 6],
        }}
      />
    </ShapeSource>
  );
};

export default LineRoute;
