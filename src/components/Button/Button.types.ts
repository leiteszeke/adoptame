import { TouchableOpacityProps, ViewStyle } from 'react-native';

export enum ButtonVariant {
  Primary = 'Primary',
  Secondary = 'Secondary',
}

export type ButtonProps = Omit<TouchableOpacityProps, 'onPress'> & {
  containerStyle?: ViewStyle;
  disabled?: boolean;
  text: string;
  variant?: ButtonVariant;
  onPress?: () => void;
};
