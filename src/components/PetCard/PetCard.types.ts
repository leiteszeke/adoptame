import { ViewStyle } from 'react-native';
import { Pet } from 'services/pets';

export type PetCardProps = Pet & {
  containerStyle?: ViewStyle;
  horizontal?: boolean;
  onPress?: (item: Pet) => void;
  onToggle?: () => void;
};
