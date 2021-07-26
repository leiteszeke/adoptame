import React from 'react';
import { View } from 'react-native';

const Separator = ({ size = 4 }: { size: number }) => (
  <View style={{ height: size }} />
);

export default Separator;
