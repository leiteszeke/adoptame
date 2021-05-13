import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageStyle,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import C, { apply, classNames, theme } from 'consistencss';
import Wrapper from 'components/Wrapper';
import { Attach, Back, Send } from 'components/Icons';
import {
  StackActions,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from 'components/Button';

const chat = {
  message:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas netus cum purus egestas.',
};

const chats = [
  {
    user: {
      id: 1,
      name: 'John Doe',
      image: 'https://picsum.photos/id/1/100/100',
    },
    messages: [
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
    ],
  },
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
      itemsStart: userId !== 1,
    })}>
    <View
      style={apply(
        classNames('radius2 px3 py2', {
          'bgBrand2 ': userId === 1,
          bgDark4: userId !== 1,
        }),
        { maxWidth: '70%' },
      )}>
      <Text
        style={classNames('fontDozen line3', {
          'textLight3 alignRight': userId === 1,
          'textDark1 alignLeft': userId !== 1,
        })}>
        {message}
      </Text>
    </View>
  </View>
);

enum ChatType {
  Message = 'message',
  Adoption = 'adoption',
}

const Chat = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const { params } = useRoute<any>();
  const [chatPage, setChatPage] = useState<any>();
  const [chatType, setChatType] = useState<ChatType>(ChatType.Message);

  const fetchUser = (userId: number) => {
    const chatsFound = chats.find(c => c.user.id === userId);

    setChatPage(() => {
      if (chatsFound) {
        return chatsFound;
      }

      return {
        user: {
          id: userId,
          name: 'Jane Doe',
          image: 'https://picsum.photos/id/3/100/100',
        },
        messages: [],
      };
    });
    scrollViewRef.current?.scrollToEnd();
  };

  const requestAdoption = () => {
    setChatPage((prev: any) => ({
      ...prev,
      messages: [
        ...prev.messages,
        { message: `Hola quiero adoptar a ${params.name}` },
      ],
    }));
    setChatType(ChatType.Message);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd();
  }, [chatPage]);

  useFocusEffect(
    useCallback(() => {
      navigation.dangerouslyGetParent()?.setOptions({
        tabBarVisible: false,
      });

      if (params) {
        if (params.userId) {
          fetchUser(params.userId);
        }

        if (params.chatType) {
          setChatType(params.chatType);
        } else {
          setChatType(ChatType.Message);
        }
      }

      return () => {
        navigation.dangerouslyGetParent()?.setOptions({
          tabBarVisible: true,
        });
      };
    }, [navigation, params]),
  );

  const goChats = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  if (!chatPage) {
    return null;
  }

  return (
    <Wrapper withTabs={false}>
      <TouchableOpacity
        style={apply(C.ml3, C.mt3, C.h9, C.w9)}
        onPress={goChats}>
        <Back />
      </TouchableOpacity>
      <View style={apply(C.mx3, C.row, C.h12, C.itemsCenter, C.mt2)}>
        <View
          style={apply(
            C.h12,
            C.w12,
            C.radius2,
            C.borderDouble,
            C.borderLight3,
          )}>
          <Image
            source={{ uri: chatPage.user.image }}
            borderRadius={8}
            style={apply(C.h11, C.w11) as ImageStyle}
          />
        </View>
        <Text style={apply(C.font8, C.ml3, C.textLight3, C.weightBold)}>
          {chatPage.user.name}
        </Text>
      </View>
      <View
        style={apply(
          C.radiustop4,
          C.bgLight1,
          C.absolute,
          C.wFull,
          C.pt3,
          C.px4,
          {
            height: '91.2%',
            bottom: -insets.bottom - 12,
            paddingBottom: insets.bottom,
          },
        )}>
        <ScrollView
          ref={scrollViewRef}
          style={apply(C.flex)}
          showsVerticalScrollIndicator={false}>
          {chatPage.messages.map(
            (currentChat: { message: string }, index: number) => (
              <ChatMessage
                key={index}
                {...currentChat}
                userId={index % 2 === 0 ? 1 : 2}
              />
            ),
          )}
        </ScrollView>
        <View style={apply(C.h12, C.mt2, C.mb3, C.wFull)}>
          {chatType === ChatType.Adoption ? (
            <Button
              containerStyle={apply(C.mx0) as ViewStyle}
              text="Solicitar adopción"
              onPress={requestAdoption}
            />
          ) : (
            <View
              style={apply(
                C.bgLight3,
                C.row,
                C.justifyBetween,
                C.hFull,
                C.radius3,
                C.itemsCenter,
                C.px2,
              )}>
              <TouchableOpacity
                style={apply(C.w9, C.h9, C.itemsCenter, C.justifyCenter)}>
                <Attach color={theme.colors.brand2} />
              </TouchableOpacity>
              <TextInput
                style={apply(C.hFull, C.flex, C.italic, C.px2)}
                placeholder="Envia tu mensaje"
                placeholderTextColor={theme.colors.dark3}
              />
              <TouchableOpacity
                style={apply(
                  C.bgBrand2,
                  C.radius2,
                  C.w9,
                  C.h9,
                  C.itemsCenter,
                  C.justifyCenter,
                )}>
                <Send />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Wrapper>
  );
};

export default Chat;
