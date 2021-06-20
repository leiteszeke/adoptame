import { TextInputProps, ViewStyle } from 'react-native';

export type InputProps = Omit<TextInputProps, 'onChange'> & {
  onChange?: (value: string) => void;
  label?: string;
  containerStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  inputStyle?: ViewStyle;
};

export type ForwardedInputProps = Partial<TextInputProps> & {
  getValue: () => string;
};
