import React, { useCallback } from 'react';
import { Image, ImageStyle, Text, TouchableOpacity, View } from 'react-native';
import C, { apply } from 'consistencss';
import Wrapper from 'components/Wrapper';
import { Back } from 'components/Icons';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { RootStackParamList } from 'types';
import * as Images from 'assets/images';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_MESSAGE, GET_CHAT, Chat } from 'services/chats';
import Routes from 'routes';

const ChatScreen = () => {
  const currentUser = { _id: '' };
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { params } = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const { data } = useQuery<{ chat: Chat }>(GET_CHAT, {
    variables: { id: params._id },
  });
  const [addMessageMutation] = useMutation(ADD_MESSAGE, {
    refetchQueries: [
      {
        query: GET_CHAT,
        variables: { id: params._id },
      },
    ],
  });

  const goChats = () => {
    navigation.navigate(Routes.ChatStack, {
      screen: Routes.Chats,
    });
  };

  const onSend = (messages: IMessage[]) => {
    messages.forEach(async message => {
      await addMessageMutation({
        variables: {
          chatId: params._id,
          messageId: message._id,
          text: message.text,
        },
      });
    });
  };

  useFocusEffect(
    useCallback(() => {
      navigation.dangerouslyGetParent()?.setOptions({
        tabBarVisible: false,
      });

      return () => {
        navigation.dangerouslyGetParent()?.setOptions({
          tabBarVisible: true,
        });
      };
    }, [navigation]),
  );

  return (
    <Wrapper withTabs={false}>
      <TouchableOpacity
        style={apply(C.ml3, C.mt3, C.h9, C.w9)}
        onPress={goChats}>
        <Back />
      </TouchableOpacity>
      <View style={apply(C.mx3, C.row, C.h12, C.itemsCenter, C.mt1)}>
        <View
          style={apply(
            C.h12,
            C.w12,
            C.radius2,
            C.borderDouble,
            C.borderLight3,
          )}>
          <Image
            source={{ uri: params?.other.image ?? Images.Placeholders.User }}
            borderRadius={8}
            style={apply(C.h11, C.w11) as ImageStyle}
          />
        </View>
        <Text style={apply(C.font8, C.ml3, C.textLight3, C.weightBold)}>
          {params?.other.name}
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
            height: '91%',
            bottom: -insets.bottom - 12,
            paddingBottom: insets.bottom,
          },
        )}>
        <GiftedChat
          messages={data?.chat.messages}
          onSend={message => onSend(message)}
          user={{
            _id: currentUser._id,
          }}
        />
      </View>
    </Wrapper>
  );
};

export default ChatScreen;
