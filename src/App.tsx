import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import C, { apply, extend, theme } from 'consistencss';
import * as Icons from 'components/Icons';
import Home from 'screens/Home/Home';
import Settings from 'screens/Settings/Settings';
import Chat from 'screens/Chat/Chat';
import Pet from 'screens/Pet/Pet';
import Favorites from 'screens/Favorites/Favorites';

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator();

extend({
  colors: {
    dark1: '#000000',
    dark2: '#343532',
    dark3: '#72746F',
    dark4: '#C4C4C4',

    brand1: '#103900',
    brand2: '#059E54',
    brand3: '#00CC74',

    light1: '#EFEFEF',
    light2: '#FAFAFA',
    light3: '#FFFFFF',

    transparent: 'transparent',
  },
  sizing: {
    minimum: 1,
    double: 2,
    dozen: 10,
  },
});

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

const tabBarOptions = (screen: string) => () => ({
  tabBarIcon: ({ color }: { color: string }) => {
    const Icon = getIcon(screen);
    return Icon ? <Icon color={color} size={30} /> : null;
  },
});

const TabStack = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: theme.colors.dark1,
      inactiveTintColor: theme.colors.light3,
      style: apply(C.bgBrand2, C.radiustop4, C.absolute),
      showLabel: false,
    }}>
    <Tab.Screen name="Home" options={tabBarOptions('Home')} component={Home} />
    <Tab.Screen
      name="Favorites"
      options={tabBarOptions('Favorites')}
      component={Favorites}
    />
    <Tab.Screen name="Chat" options={tabBarOptions('Chat')} component={Chat} />
    <Tab.Screen
      name="Settings"
      options={tabBarOptions('Settings')}
      component={Settings}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Tabs" component={TabStack} />
      <Stack.Screen
        name="Pet"
        component={Pet}
        sharedElementsConfig={route => {
          return [
            {
              id: `item.${route.params.id}.photo`,
              animation: 'move',
            },
          ];
        }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default AppStack;
