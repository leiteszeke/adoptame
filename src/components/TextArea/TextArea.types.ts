import { TextInputProps, ViewStyle } from 'react-native';

export type TextAreaProps = Omit<
  TextInputProps,
  'onChange' | 'secureTextEntry' | 'keyboardAppareance' | 'keyboardType'
> & {
  onChange?: (value: string) => void;
  label?: string;
  containerStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  inputStyle?: ViewStyle;
};

export type ForwardedTextAreaProps = Partial<TextAreaProps> & {
  getValue: () => string;
};
