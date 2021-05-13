import C, { apply } from 'consistencss';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ButtonProps } from './Button.types';

const Button = ({ containerStyle, text, onPress }: ButtonProps) => {
  const handlePress = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity
      style={apply(
        C.h13,
        C.justifyCenter,
        C.itemsCenter,
        C.bgBrand2,
        C.radius4,
        C.mx3,
        C.mt3,
        containerStyle,
      )}
      onPress={handlePress}>
      <Text style={apply(C.textLight3, C.weightSemiBold, C.font6)}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
