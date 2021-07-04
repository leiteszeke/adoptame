import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import C, { apply } from 'consistencss';
import * as Icons from 'components/Icons';
import { TouchableOpacity, Text, View } from 'react-native';
import { useAuthDispatch, useUser } from 'hooks/Auth';
import { AuthReducerAction } from 'reducers/AuthReducer';
import { navigate } from 'services/navigation';
import { EventRegister } from 'react-native-event-listeners';

export const SideMenu = () => {
  const user = useUser();
  const dispatch = useAuthDispatch();

  const logout = () =>
    dispatch?.({
      type: AuthReducerAction.LOGOUT,
    });

  const login = () => {
    EventRegister.emit('toggleDrawer');
    navigate('Login');
  };

  return (
    <SafeAreaView style={apply(C.flex, C.px4, C.py2)}>
      <View style={apply(C.flex)}>
        <TouchableOpacity style={apply(C.row, C.itemsCenter, C.h12)}>
          <Icons.Donate />
          <Text style={apply(C.ml3, C.font4, C.familyPopSemi, C.textLight3)}>
            Donar
          </Text>
        </TouchableOpacity>
        {user && (
          <>
            <TouchableOpacity style={apply(C.row, C.mt2, C.itemsCenter, C.h12)}>
              <Icons.Foot />
              <Text
                style={apply(C.ml3, C.font4, C.familyPopSemi, C.textLight3)}>
                Agregar mascota
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={apply(C.row, C.mt2, C.itemsCenter, C.h12)}>
              <Icons.Heart outline={false} />
              <Text
                style={apply(C.ml3, C.font4, C.familyPopSemi, C.textLight3)}>
                Favoritos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={apply(C.row, C.mt2, C.itemsCenter, C.h12)}>
              <Icons.Chat />
              <Text
                style={apply(C.ml3, C.font4, C.familyPopSemi, C.textLight3)}>
                Mensajes
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <View>
        <>
          {user ? (
            <TouchableOpacity
              onPress={logout}
              style={apply(C.row, C.itemsCenter, C.h12)}>
              <Icons.Logout />
              <Text
                style={apply(C.ml3, C.font4, C.familyPopSemi, C.textLight3)}>
                Salir
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={login}
              style={apply(C.row, C.itemsCenter, C.h12)}>
              <Icons.Donate />
              <Text
                style={apply(C.ml3, C.font4, C.familyPopSemi, C.textLight3)}>
                Ingresar
              </Text>
            </TouchableOpacity>
          )}
        </>
      </View>
    </SafeAreaView>
  );
};

export default SideMenu;
