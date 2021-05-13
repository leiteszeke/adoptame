import { ViewStyle } from 'react-native';

export type PetCardProps = {
  containerStyle?: ViewStyle;
  id: number;
  date: Date;
  name: string;
  horizontal?: boolean;
  like?: boolean;
  image: string;
  age: string;
  location?: string;
  onPress?: (item: any) => void;
};
