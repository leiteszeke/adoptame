import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import C, { apply } from 'consistencss';
import Icons from 'components/Icons';
import { TouchableOpacity, Text, View } from 'react-native';
import { useAuthDispatch, useUser } from 'hooks/Auth';
import { AuthReducerAction } from 'reducers/AuthReducer';
import { navigate } from 'services/navigation';
import { EventRegister } from 'react-native-event-listeners';
import Routes from 'routes';

const MenuItem = ({
  icon: Icon,
  text,
  route,
  onPress,
}: {
  icon: any;
  text: string;
  route?: string;
  onPress?: () => void;
}) => {
  const handlePress = () => {
    EventRegister.emit('toggleDrawer');

    if (onPress) {
      onPress();
    } else if (route) {
      navigate(route);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={apply(C.row, C.itemsCenter, C.h12)}>
      <Icon />
      <Text style={apply(C.ml3, C.font4, C.familyPopSemi, C.textLight3)}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const SideMenu = () => {
  const user = useUser();
  const dispatch = useAuthDispatch();

  const logout = () =>
    dispatch?.({
      type: AuthReducerAction.LOGOUT,
    });

  const login = () => {
    EventRegister.emit('toggleDrawer');
    navigate(Routes.Login);
  };

  return (
    <SafeAreaView style={apply(C.flex, C.px4, C.py2)}>
      <View style={apply(C.flex)}>
        <MenuItem icon={Icons.Donate} text="Donar" route="" />
        {user && (
          <>
            <MenuItem
              icon={Icons.Foot}
              text="Agregar mascota"
              route={Routes.AddPet}
            />

            <MenuItem
              icon={Icons.HeartFilled}
              text="Favoritos"
              route={Routes.Favorites}
            />

            <MenuItem icon={Icons.Chat} text="Mensajes" route={Routes.Chat} />
          </>
        )}
      </View>
      <View>
        {user ? (
          <MenuItem icon={Icons.Logout} text="Salir" onPress={logout} />
        ) : (
          <MenuItem icon={Icons.Donate} text="Ingresar" onPress={login} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SideMenu;
