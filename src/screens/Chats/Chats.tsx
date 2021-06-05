import React from 'react';
import {
  FlatList,
  Image,
  ImageStyle,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import C, { apply } from 'consistencss';
import Wrapper from 'components/Wrapper';
import { Back } from 'components/Icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';
import { Chat, GET_CHATS } from 'services/chats';
import * as Images from 'assets/images';
import { User } from 'services/users';
import { useUser } from 'hooks/Auth';
import NotLoggedScreen from 'components/NotLoggedScreen';

const Chats = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const user = useUser();
  const { data } = useQuery<{ chats: Chat[] }>(GET_CHATS);

  const goChat = (_id: string, other: User) => () => {
    navigation.navigate('Chat', { _id, other });
  };

  const renderItem = ({ item: chat }: { item: Chat }) => (
    <TouchableOpacity
      onPress={goChat(chat._id, chat.other)}
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

  const openLogin = () => {
    navigation.navigate('Login');
  };

  if (!user) {
    return (
      <NotLoggedScreen
        message="Necesitamos saber quien esos para poder mostrarte tus chats"
        buttonText="Ingresar"
        onPress={openLogin}
      />
    );
  }

  return (
    <Wrapper withTabs={false}>
      <TouchableOpacity
        style={apply(C.ml3, C.mt3, C.h9, C.w9)}
        onPress={() => navigation.goBack()}>
        <Back />
      </TouchableOpacity>
      <View style={apply(C.mx3, C.row, C.h12, C.itemsCenter, C.mt1)}>
        <Text style={apply(C.font8, C.textLight3, C.weightBold)}>Chats</Text>
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
            height: '83%',
            bottom: 15,
            paddingBottom: insets.bottom - 8,
          },
        )}>
        <FlatList
          data={data?.chats ?? []}
          keyExtractor={i => i._id}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
    </Wrapper>
  );
};

export default Chats;
