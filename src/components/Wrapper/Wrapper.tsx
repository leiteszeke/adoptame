import Icons from 'components/Icons';
import C, { apply, classNames, theme } from 'consistencss';
import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  HeaderProps,
  SearchProps,
  TitleProps,
  WrapperFlatListProps,
  WrapperHeight,
  WrapperProps,
  WrapperScrollViewProps,
  WrapperContentType,
  WithInsets,
} from './Wrapper.types';

const Wrapper = ({
  children,
  containerStyle,
  withTabs = false,
  type = WrapperContentType.View,
  contentProps,
}: WrapperProps) => {
  const insets = useSafeAreaInsets();

  let Container: any = React.Fragment;
  let spreadProps: WithInsets<WrapperProps['contentProps']> | {} = {};

  switch (type) {
    case WrapperContentType.List:
      Container = WrapperFlatList;
      spreadProps = {
        ...contentProps,
        insets,
      };
      break;

    case WrapperContentType.Scroll:
      Container = WrapperScrollView;
      spreadProps = {
        ...contentProps,
        insets,
      };
      break;
  }

  return (
    <SafeAreaView
      style={apply(
        C.flex,
        C.bgBrand2,
        withTabs && { marginBottom: insets.bottom },
        containerStyle,
      )}>
      <View style={C.flex}>
        <Container {...spreadProps}>{children}</Container>
      </View>
    </SafeAreaView>
  );
};

const Header = ({ leftIconPress, leftIcon: LeftIcon }: HeaderProps) => (
  <TouchableOpacity
    style={apply(C.mx2, C.h7, C.justifyCenter, C.mt2)}
    onPress={leftIconPress}>
    <LeftIcon />
  </TouchableOpacity>
);

const Title = ({ title }: TitleProps) =>
  title ? (
    <View style={apply(C.mx3, C.h12, C.justifyCenter, C.mt2)}>
      <Text style={apply(C.font8, C.textLight3, C.weightBold)}>{title}</Text>
    </View>
  ) : null;

const Search = ({ onSearch }: SearchProps) =>
  onSearch ? (
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
  ) : null;

const WrapperScrollView = ({
  children,
  leftIcon,
  leftIconPress,
  isEmpty,
  onSearch,
  title,
  insets,
}: WithInsets<WrapperScrollViewProps>) => (
  <>
    <Header leftIcon={leftIcon} leftIconPress={leftIconPress} />

    <Title title={title} />

    <Search onSearch={onSearch} />

    <ScrollView
      style={apply(
        C.radiustop4,
        C.bgLight1,
        C.absolute,
        C.wFull,
        C.pt3,
        C.pb22,
        C.px4,
        {
          height: WrapperHeight,
          bottom: -insets.bottom,
        },
      )}
      bounces={!isEmpty}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={classNames('pb6', {
        flex: isEmpty,
      })}>
      <>{children}</>
    </ScrollView>
  </>
);

const WrapperFlatList = ({
  children,
  leftIcon,
  leftIconPress,
  onSearch,
  title,
  insets,
}: WithInsets<WrapperFlatListProps>) => (
  <>
    <Header leftIcon={leftIcon} leftIconPress={leftIconPress} />

    <Title title={title} />

    <Search onSearch={onSearch} />

    <View
      style={apply(
        C.radiustop4,
        C.bgLight1,
        C.absolute,
        C.wFull,
        C.px4,
        C.pt3,
        C.pb23,
        {
          height: WrapperHeight,
          bottom: -insets.bottom,
        },
      )}>
      <>{children}</>
    </View>
  </>
);

export default Wrapper;
