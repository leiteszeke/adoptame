import C, { apply } from 'consistencss';
import React, { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const Wrapper = ({
  children,
  containerStyle,
  withTabs = true,
}: PropsWithChildren<{ containerStyle?: ViewStyle; withTabs?: boolean }>) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={apply(
        C.flex,
        C.bgBrand2,
        withTabs && { marginBottom: insets.bottom },
        containerStyle,
      )}>
      <View style={apply(C.flex, C.mb3)}>{children}</View>
    </SafeAreaView>
  );
};

export default Wrapper;
