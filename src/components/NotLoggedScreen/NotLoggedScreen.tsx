import Button from 'components/Button';
import { NotLogged } from 'components/Illustrations';
import C, { apply } from 'consistencss';
import React from 'react';
import { Text, View } from 'react-native';

const NotLoggedScreen = ({
  buttonText,
  message,
  onPress,
}: {
  buttonText?: string;
  message?: string;
  onPress?: () => void;
}) => {
  return (
    <View style={apply(C.flex, C.itemsCenter, C.justifyCenter, C.px4)}>
      <NotLogged height={200} width={200} />
      <Text style={apply(C.mt3, C.alignCenter, C.font4)}>{message}</Text>
      {buttonText && (
        <Button onPress={onPress} text={buttonText} containerStyle={C.wFull} />
      )}
    </View>
  );
};

export default NotLoggedScreen;
