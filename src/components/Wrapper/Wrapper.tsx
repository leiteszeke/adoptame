import Icons from 'components/Icons';
import C, { apply, classNames, theme } from 'consistencss';
import { DebouncedFunc } from 'lodash';
import React, { PropsWithChildren } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const Wrapper = ({
  children,
  containerStyle,
  withTabs = true,
}: PropsWithChildren<{ containerStyle?: ViewStyle; withTabs?: boolean }>) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={apply(
        C.flex,
        C.bgBrand2,
        withTabs && { marginBottom: insets.bottom },
        containerStyle,
      )}>
      <View style={apply(C.flex, C.mb3)}>{children}</View>
    </SafeAreaView>
  );
};

const WrapperScrollView = ({
  children,
  leftIcon: LeftIcon,
  leftIconPress,
  isEmpty,
  onSearch,
  title,
}: PropsWithChildren<{
  isEmpty?: boolean;
  leftIcon: any;
  leftIconPress: () => void;
  onSearch?: DebouncedFunc<(value: string) => void>;
  title?: string;
}>) => {
  return (
    <>
      <TouchableOpacity style={apply(C.ml2, C.mt2)} onPress={leftIconPress}>
        <LeftIcon />
      </TouchableOpacity>
      {title && (
        <View style={apply(C.mx3, C.h12, C.justifyCenter, C.mt2)}>
          <Text style={apply(C.font8, C.textLight3, C.weightBold)}>
            {title}
          </Text>
        </View>
      )}
      {onSearch && (
        <View
          style={apply(
            C.mx3,
            C.row,
            C.h12,
            C.itemsCenter,
            C.bgLight3,
            C.radius3,
            C.mt2,
            C.px3,
          )}>
          <Icons.Search color={theme.colors.dark3} />
          <TextInput
            style={apply(C.hFull, C.flex, C.px4, C.italic)}
            placeholderTextColor={theme.colors.dark3}
            placeholder="Buscá tu mascota..."
            onChangeText={onSearch}
          />
        </View>
      )}
      <ScrollView
        style={apply(
          C.radiustop4,
          C.bgLight1,
          C.absolute,
          C.wFull,
          C.py3,
          C.px4,
          {
            height: '86%',
            bottom: -12,
          },
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={classNames('pb6', {
          flex: isEmpty,
        })}>
        <>{children}</>
      </ScrollView>
    </>
  );
};

export { WrapperScrollView };
export default Wrapper;
