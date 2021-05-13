import { TouchableOpacityProps, ViewStyle } from 'react-native';

export type ButtonProps = Omit<TouchableOpacityProps, 'onPress'> & {
  containerStyle?: ViewStyle;
  text: string;
  onPress?: () => void;
};
