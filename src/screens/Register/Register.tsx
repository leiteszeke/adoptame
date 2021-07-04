import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import Button, { ButtonVariant } from 'components/Button';
import Input, { ForwardedInputProps } from 'components/Input';
import Wrapper from 'components/Wrapper';
import C, { apply } from 'consistencss';
import { useAuthDispatch } from 'hooks/Auth';
import React, { useRef } from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthReducerAction } from 'reducers/AuthReducer';
import { REGISTER_USER } from 'services/users';

const Register = () => {
  const { goBack } = useNavigation();
  const dispatch = useAuthDispatch();
  const insets = useSafeAreaInsets();
  const [registerMutation] = useMutation(REGISTER_USER, {
    onCompleted: ({ user }) => {
      if (user) {
        dispatch?.({
          type: AuthReducerAction.LOGIN,
          payload: { user },
        });

        goBack();
      }
    },
  });

  const form = {
    name: useRef<ForwardedInputProps>(null),
    lastname: useRef<ForwardedInputProps>(null),
    email: useRef<ForwardedInputProps>(null),
    password: useRef<ForwardedInputProps>(null),
    rePassword: useRef<ForwardedInputProps>(null),
  };

  const onRegister = () => {
    const name = form.name.current?.getValue();
    const lastname = form.lastname.current?.getValue();
    const email = form.email.current?.getValue();
    const password = form.password.current?.getValue();

    registerMutation({
      variables: {
        name,
        lastname,
        email,
        password,
      },
    });
  };

  return (
    <Wrapper withTabs={false}>
      <View style={apply(C.ml3, C.mt3, C.h9, C.w9)} />
      <View style={apply(C.mx3, C.row, C.h12, C.itemsCenter, C.mt1)}>
        <Text style={apply(C.font8, C.textLight3, C.weightBold)}>
          Crea tu cuenta
        </Text>
      </View>
      <View
        style={apply(
          C.radiustop4,
          C.bgLight1,
          C.absolute,
          C.wFull,
          C.pt8,
          C.px4,
          {
            height: '91%',
            bottom: -insets.bottom - 12,
            paddingBottom: insets.bottom,
          },
        )}>
        <View style={apply(C.row, C.wFull)}>
          <View style={apply(C.flex, C.mr2)}>
            <Input ref={form.name} label="Nombre" />
          </View>
          <View style={apply(C.flex, C.ml2)}>
            <Input ref={form.lastname} label="Apellido" />
          </View>
        </View>
        <View style={C.h7} />
        <Input ref={form.email} label="Email" />
        <View style={C.h7} />
        <Input ref={form.password} label="Contraseña" secureTextEntry />
        <View style={C.h7} />
        <Input
          ref={form.rePassword}
          label="Repetir contraseña"
          secureTextEntry
        />
        <View style={C.flex} />
        <Button onPress={onRegister} text="Crear cuenta" />
        <Button
          containerStyle={apply(C.mt6, C.mb4) as ViewStyle}
          text="Ya tengo una cuenta"
          variant={ButtonVariant.Secondary}
          onPress={() => goBack()}
        />
      </View>
    </Wrapper>
  );
};

export default Register;
