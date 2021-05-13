import React, { useCallback } from 'react';
import {
  Image,
  ImageStyle,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import C, { apply, classNames } from 'consistencss';
import Wrapper from 'components/Wrapper';
import { Back } from 'components/Icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const chat = {
  message:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas netus cum purus egestas.',
};

const chats = [
  chat,
  chat,
  chat,
  chat,
  chat,
  chat,
  chat,
  chat,
  chat,
  chat,
  chat,
  chat,
];

const ChatMessage = ({
  message,
  userId,
}: {
  message: string;
  userId: number;
}) => (
  <View
    style={classNames('mb5', {
      itemsEnd: userId === 1,
    })}>
    <View
      style={apply(
        classNames('radius2 px3 py2', {
          bgBrand2: userId === 1,
          bgDark4: userId !== 1,
        }),
        { width: '70%' },
      )}>
      <Text
        style={classNames('fontDozen line3', {
          textLight3: userId === 1,
          textDark1: userId !== 1,
        })}>
        {message}
      </Text>
    </View>
  </View>
);

const Chat = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        tabBarVisible: false,
      });
    }, [navigation]),
  );

  return (
    <Wrapper withTabs={false}>
      <TouchableOpacity
        style={apply(C.ml3, C.mt3, C.h9, C.w9)}
        onPress={() => navigation.goBack()}>
        <Back />
      </TouchableOpacity>
      <View style={apply(C.mx3, C.row, C.h12, C.itemsCenter, C.mt2)}>
        <View
          style={apply(C.h12, C.w12, C.radius2, C.borderDouble, C.borderWhite)}>
          <Image
            source={{ uri: 'https://picsum.photos/id/2/250/250' }}
            borderRadius={8}
            style={apply(C.h11, C.w11) as ImageStyle}
          />
        </View>
        <Text style={apply(C.font8, C.ml3, C.textWhite, C.weightBold)}>
          John Doe
        </Text>
      </View>
      <ScrollView
        style={apply(
          C.radiustop4,
          C.bgLight1,
          C.absolute,
          C.wFull,
          C.py3,
          C.px4,
          {
            height: '91.2%',
            bottom: -46,
          },
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={apply(C.pt4, C.pb8)}>
        {chats.map((currentChat, index) => (
          <ChatMessage {...currentChat} userId={index % 2 === 0 ? 1 : 2} />
        ))}
      </ScrollView>
    </Wrapper>
  );
};

export default Chat;
