import C, { apply } from 'consistencss';
import React from 'react';
import { Text, View } from 'react-native';

const NoResultsScreen = ({
  component: Component,
  message,
}: {
  component: any;
  message?: string;
}) => {
  return (
    <View style={apply(C.flex, C.itemsCenter, C.justifyCenter, C.px4)}>
      <Component height={200} width={200} />
      <Text style={apply(C.mt3, C.alignCenter, C.font4)}>{message}</Text>
    </View>
  );
};

export default NoResultsScreen;
