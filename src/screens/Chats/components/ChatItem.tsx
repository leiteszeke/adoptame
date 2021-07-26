import React from 'react';
import { Image, ImageStyle, Text, TouchableOpacity, View } from 'react-native';
import C, { apply } from 'consistencss';
import { Chat } from 'services/chats';
import * as Images from 'assets/images';
import { useNavigation } from '@react-navigation/native';
import Routes from 'routes';

const ChatItem = (chat: Chat) => {
  const { navigate } = useNavigation();

  const goChat = () => {
    navigate(Routes.Chat, { _id: chat._id, other: chat.other });
  };

  return (
    <TouchableOpacity
      onPress={goChat}
      style={apply(
        C.h16,
        C.itemsCenter,
        C.mb4,
        C.p2,
        C.row,
        C.bgLight3,
        C.radius2,
      )}>
      <View
        style={apply(
          C.h12,
          C.w12,
          C.radius2,
          C.bgBrand2,
          C.itemsCenter,
          C.justifyCenter,
        )}>
        <Image
          source={{ uri: chat.other.image ?? Images.Placeholders.User }}
          borderRadius={8}
          style={apply(C.h11, C.w11) as ImageStyle}
        />
      </View>
      <View style={apply(C.flex, C.justifyBetween, C.ml3)}>
        <View style={apply(C.flex, C.row, C.justifyBetween, C.itemsCenter)}>
          <Text style={apply(C.familyPopSemi, C.font5)}>{chat.other.name}</Text>
          <Text style={apply(C.textDark3, C.alignRight, C.font3)}>12:22</Text>
        </View>
        <Text numberOfLines={1} style={apply(C.font3)}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas netus
          cum purus egestas.
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
