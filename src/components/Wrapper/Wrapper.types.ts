import { DebouncedFunc } from 'lodash';
import { PropsWithChildren } from 'react';
import { Dimensions, ViewStyle } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

const screenDimensions = Dimensions.get('screen');

export const WrapperHeight = (screenDimensions.height - 20) * 0.84;

export enum WrapperContentType {
  Scroll = 'Scroll',
  List = 'List',
  View = 'View',
}

export type WrapperProps = PropsWithChildren<{
  containerStyle?: ViewStyle;
  withTabs?: boolean;
  type?: WrapperContentType;
  contentProps?: WrapperScrollViewProps | WrapperFlatListProps;
  withKeyboard?: boolean;
}>;

export type WithInsets<T> = T & {
  insets: EdgeInsets;
};

export type HeaderProps = {
  leftIcon?: any;
  leftIconPress?: () => void;
};

export type TitleProps = {
  title?: string;
};

export type SearchProps = {
  onSearch?: DebouncedFunc<(value: string) => void>;
};

export type WrapperScrollViewProps = PropsWithChildren<
  HeaderProps &
    TitleProps &
    SearchProps & {
      isEmpty?: boolean;
    }
>;

export type WrapperFlatListProps = Omit<WrapperScrollViewProps, 'isEmpty'>;
