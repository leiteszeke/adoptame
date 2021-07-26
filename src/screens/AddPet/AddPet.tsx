import React from 'react';
import Wrapper, { WrapperContentType } from 'components/Wrapper';
import Icons from 'components/Icons';
import { useNavigation } from '@react-navigation/native';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import Separator from 'components/Separator';
import { View } from 'react-native';

const AddPet = () => {
  const { goBack } = useNavigation();

  return (
    <Wrapper
      type={WrapperContentType.Scroll}
      withKeyboard
      contentProps={{
        leftIcon: Icons.Back,
        leftIconPress: goBack,
        title: 'Agregar mascota',
      }}>
      <Input label="Nombre" />
      <Separator size={16} />
      <Input label="Ubicación" />
      <Separator size={16} />
      <View>
        <View />
        <View />
      </View>
      <Separator size={16} />
      <TextArea label="Descripción" />
    </Wrapper>
  );
};

export default AddPet;
