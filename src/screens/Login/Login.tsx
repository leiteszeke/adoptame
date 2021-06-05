import { useNavigation } from '@react-navigation/core';
import { Back } from 'components/Icons';
import Wrapper from 'components/Wrapper';
import C, { apply } from 'consistencss';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Login = () => {
  const { goBack } = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <Wrapper withTabs={false}>
      <TouchableOpacity
        style={apply(C.ml3, C.mt3, C.h9, C.w9)}
        onPress={goBack}>
        <Back />
      </TouchableOpacity>
      <View style={apply(C.mx3, C.row, C.h12, C.itemsCenter, C.mt1)}>
        <Text style={apply(C.font8, C.textLight3, C.weightBold)}>Ingresa</Text>
      </View>
      <View
        style={apply(
          C.radiustop4,
          C.bgLight1,
          C.absolute,
          C.wFull,
          C.pt3,
          C.px4,
          {
            height: '91%',
            bottom: -insets.bottom - 12,
            paddingBottom: insets.bottom,
          },
        )}></View>
    </Wrapper>
  );
};

export default Login;
