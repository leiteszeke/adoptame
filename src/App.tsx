import React, { useEffect, useRef, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import C, { apply, extend, theme } from 'consistencss';
import Icons from 'components/Icons';
import Screens from 'screens/index';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import Animated, { EasingNode } from 'react-native-reanimated';

import { EventRegister } from 'react-native-event-listeners';
import { ApolloProvider } from '@apollo/client';
import GraphQLClient from './client';
import AuthProvider from 'contexts/Auth';
import { authInitialState, AuthReducer } from 'reducers/AuthReducer';
import SideMenu from 'components/SideMenu';
import { navigationRef } from 'services/navigation';
import Routes from './routes';

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const { width } = Dimensions.get('window');

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
  fonts: {
    PopBold: 'Poppins-Bold',
    PopSemi: 'Poppins-SemiBold',
    Pop: 'Poppins-Regular',
    PopLight: 'Poppins-Light',
    PopItalic: 'Poppins-Italic',
  },
  sizing: {
    minimum: 1,
    double: 2,
    dozen: 10,
    ThreeQuarter: '75%',
  },
});

const getIcon = (name: string) => {
  switch (name) {
    case 'Home':
      return Icons.Home;

    case 'Favorites':
      return Icons.Heart;

    case 'Chat':
      return Icons.Chat;
  }
};

const tabBarOptions = (screen: string, options?: any) => () => ({
  tabBarIcon: ({ color }: { color: string }) => {
    const Icon = getIcon(screen);
    return Icon ? <Icon color={color} size={30} /> : null;
  },
  ...options,
});

const ChatStack = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={Routes.Chats} component={Screens.Chats} />
    <Stack.Screen name={Routes.Chat} component={Screens.Chat} />
  </Stack.Navigator>
);

const TabStack = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: theme.colors.dark1,
      inactiveTintColor: theme.colors.light3,
      style: apply(C.bgBrand2, C.radiustop4, C.absolute),
      showLabel: false,
    }}>
    <Tab.Screen
      name={Routes.Home}
      options={tabBarOptions('Home')}
      component={Screens.Home}
    />
    <Tab.Screen
      name={Routes.Favorites}
      options={tabBarOptions('Favorites')}
      component={Screens.Favorites}
    />
    <Tab.Screen
      name={Routes.ChatStack}
      options={tabBarOptions('Chat')}
      component={ChatStack}
    />
  </Tab.Navigator>
);

const App = () => {
  const [show, setShow] = useState<boolean>(false);
  const translateX = useRef(new Animated.Value(-width)).current;
  const translateXContent = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    EventRegister.addEventListener('openDrawer', () => {
      setShow(true);
    });

    EventRegister.addEventListener('closeDrawer', () => {
      setShow(false);
    });

    EventRegister.addEventListener('toggleDrawer', () => {
      setShow(prev => !prev);
    });

    return () => {
      EventRegister.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (show) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        easing: EasingNode.inOut(EasingNode.linear),
      }).start();
      Animated.timing(translateXContent, {
        toValue: (width / 4) * 3,
        duration: 300,
        easing: EasingNode.inOut(EasingNode.linear),
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: -width,
        duration: 300,
        easing: EasingNode.inOut(EasingNode.linear),
      }).start();
      Animated.timing(translateXContent, {
        toValue: 0,
        duration: 300,
        easing: EasingNode.inOut(EasingNode.linear),
      }).start();
    }
  }, [show, translateX, translateXContent]);

  return (
    <>
      <Animated.View
        style={apply(C.absolute, C.bgBrand2, C.row, C.wFull, C.hFull, {
          zIndex: 2,
          transform: [{ translateX: translateX as unknown as number }],
        })}>
        <View style={apply(C.bgBrand2, C.wFull, C.hFull)}>
          <SideMenu />
        </View>
      </Animated.View>
      <Animated.View
        style={apply(C.flex, C.bgBrand2, C.shadowLg, {
          zIndex: 3,
          transform: [{ translateX: translateXContent as unknown as number }],
        })}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShow(false)}
          style={apply(C.absolute, C.wFull, C.hFull, C.top0, {
            zIndex: show ? 4 : 0,
          })}
        />
        <Stack.Navigator mode="modal" headerMode="none">
          <Stack.Screen name={Routes.Tabs} component={TabStack} />
          <Stack.Screen name={Routes.AddPet} component={Screens.AddPet} />
          <Stack.Screen name={Routes.Pet} component={Screens.Pet} />
          <Stack.Screen name={Routes.Login} component={Screens.Login} />
          <Stack.Screen name={Routes.Register} component={Screens.Register} />
        </Stack.Navigator>
      </Animated.View>
    </>
  );
};

const AppStack = () => {
  return (
    <ApolloProvider client={GraphQLClient}>
      <NavigationContainer ref={navigationRef}>
        <SafeAreaProvider>
          <AuthProvider initialState={authInitialState} reducer={AuthReducer}>
            <App />
          </AuthProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default AppStack;
