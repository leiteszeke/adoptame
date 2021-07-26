import React from 'react';
import Wrapper, { WrapperContentType } from 'components/Wrapper';
import { Text } from 'react-native';
import Icons from 'components/Icons';
import { useNavigation } from '@react-navigation/native';

const AddPet = () => {
  const { goBack } = useNavigation();

  return (
    <Wrapper
      type={WrapperContentType.Scroll}
      contentProps={{
        leftIcon: Icons.Back,
        leftIconPress: goBack,
        title: 'Agregar mascota',
      }}>
      <Text>Hola</Text>
    </Wrapper>
  );
};

export default AddPet;
