import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import Button, { ButtonVariant } from 'components/Button';
import Input, { ForwardedInputProps } from 'components/Input';
import Wrapper from 'components/Wrapper';
import C, { apply } from 'consistencss';
import { useAuthDispatch } from 'hooks/Auth';
import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthReducerAction } from 'reducers/AuthReducer';
import { LOGIN_USER } from 'services/users';
import Routes from 'routes';
import Icons from 'components/Icons';

const Login = () => {
  const { goBack, navigate } = useNavigation();
  const dispatch = useAuthDispatch();
  const insets = useSafeAreaInsets();
  const [loginMutation] = useMutation(LOGIN_USER, {
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
    email: useRef<ForwardedInputProps>(null),
    password: useRef<ForwardedInputProps>(null),
  };

  const onLogin = () => {
    const email = form.email.current?.getValue();
    const password = form.password.current?.getValue();

    loginMutation({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <Wrapper withTabs={false}>
      <TouchableOpacity
        style={apply(C.ml3, C.mt3, C.h9, C.w9)}
        onPress={goBack}>
        <Icons.Back />
      </TouchableOpacity>
      <View style={apply(C.mx3, C.row, C.h12, C.itemsCenter, C.mt1)}>
        <Text style={apply(C.font8, C.textLight3, C.weightBold)}>Ingresa</Text>
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
        <Input label="Email" ref={form.email} />
        <View style={C.h7} />
        <Input label="Contraseña" ref={form.password} secureTextEntry />
        <View style={C.flex} />
        <Button text="Ingresar" onPress={onLogin} />
        <Button
          containerStyle={apply(C.mt6, C.mb4) as ViewStyle}
          text="Crear una cuenta"
          variant={ButtonVariant.Secondary}
          onPress={() => navigate(Routes.Register)}
        />
      </View>
    </Wrapper>
  );
};

export default Login;
