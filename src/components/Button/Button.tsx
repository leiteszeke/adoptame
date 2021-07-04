import { apply, classNames } from 'consistencss';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ButtonProps, ButtonVariant } from './Button.types';

const Button = ({
  containerStyle,
  disabled = false,
  variant = ButtonVariant.Primary,
  text,
  onPress,
}: ButtonProps) => {
  const handlePress = () => {
    if (!disabled) {
      onPress?.();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.8}
      style={apply(
        classNames('h13 justifyCenter itemsCenter radius4 mt3', {
          bgBrand2: variant === ButtonVariant.Primary,
          bgDark4: variant === ButtonVariant.Secondary,
        }),
        containerStyle,
      )}
      onPress={handlePress}>
      <Text
        style={classNames('weightSemiBold font6', {
          textLight3: variant === ButtonVariant.Primary,
          textDark3: variant === ButtonVariant.Secondary,
        })}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
