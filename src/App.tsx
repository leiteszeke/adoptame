import React, { PropsWithChildren } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ScrollView, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import C, { apply, extend, theme } from 'consistencss';
import * as Icons from 'components/Icons';

const Tab = createBottomTabNavigator();

extend({
  colors: {
    dark1: '#000000',
    dark2: '#343532',
    dark3: '#72746F',

    brand1: '#103900',
    brand2: '#059E54',
    brand3: '#00CC74',

    light1: '#EFEFEF',
    light2: '#FAFAFA',
    light3: '#FFFFFF',

    transparent: 'transparent',
  },
});

const HomeScreen = () => (
  <Wrapper withTabs>
    <View
      style={apply(
        C.bgLight1,
        C.absolute,
        C.bottom0,
        C.wFull,
        C.radiustop4,
        C.px4,
        {
          height: '90%',
        },
      )}>
      <ScrollView style={apply(C.py4)}>
        <Text>Home</Text>
      </ScrollView>
    </View>
  </Wrapper>
);

const FavoritesScreen = () => (
  <Wrapper withTabs>
    <Text>Favorites</Text>
  </Wrapper>
);

const ChatScreen = () => (
  <Wrapper withTabs>
    <Text>Chat</Text>
  </Wrapper>
);

const SettingsScreen = () => (
  <Wrapper withTabs>
    <Text>Settings</Text>
  </Wrapper>
);

const Wrapper = ({
  children,
  withTabs = false,
}: PropsWithChildren<{ withTabs?: boolean }>) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={apply(C.flex, withTabs && { paddingBottom: -insets.bottom })}>
      {children}
    </SafeAreaView>
  );
};

const getIcon = (name: string) => {
  switch (name) {
    case 'Home':
      return Icons.Home;

    case 'Settings':
      return Icons.Settings;

    case 'Favorites':
      return Icons.Heart;

    case 'Chat':
      return Icons.Chat;
  }
};

const tabBarOptions = (screen: string) => () => {
  return {
    tabBarLabel: '',
    tabBarIcon: ({ color }: { color: string }) => {
      const Icon = getIcon(screen);
      return Icon ? <Icon color={color} /> : null;
    },
  };
};

const App = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.dark1,
        inactiveTintColor: theme.colors.light3,
        style: apply(C.bgBrand2, C.radiustop4),
        showLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        options={tabBarOptions('Home')}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Favorites"
        options={tabBarOptions('Favorites')}
        component={FavoritesScreen}
      />
      <Tab.Screen
        name="Chat"
        options={tabBarOptions('Chat')}
        component={ChatScreen}
      />
      <Tab.Screen
        name="Settings"
        options={tabBarOptions('Settings')}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

const Stack = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default Stack;
