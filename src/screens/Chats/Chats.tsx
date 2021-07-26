import React from 'react';
import { FlatList } from 'react-native';
import { classNames } from 'consistencss';
import Wrapper, { WrapperContentType } from 'components/Wrapper';
import Icons from 'components/Icons';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { Chat, GET_CHATS } from 'services/chats';
import { useUser } from 'hooks/Auth';
import NotLoggedScreen from 'components/NotLoggedScreen';
import Routes from 'routes';
import NoResultsScreen from 'components/NoResultsScreen';
import { EmptyChats } from 'components/Illustrations';
import ChatItem from './components/ChatItem';

const Chats = () => {
  const { goBack, navigate } = useNavigation();
  const user = useUser();
  const { data } = useQuery<{ chats: Chat[] }>(GET_CHATS);

  const openLogin = () => navigate(Routes.Login);

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
    <Wrapper
      type={WrapperContentType.List}
      contentProps={{
        title: 'Chats',
        leftIcon: Icons.Back,
        leftIconPress: goBack,
      }}>
      <FlatList
        data={data?.chats ?? []}
        keyExtractor={i => i._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: Chat }) => <ChatItem {...item} />}
        ListEmptyComponent={
          <NoResultsScreen
            component={EmptyChats}
            message={'Aún no tienes chats.'}
          />
        }
        contentContainerStyle={classNames({
          flex: (data?.chats?.length ?? 0) === 0,
        })}
      />
    </Wrapper>
  );
};

export default Chats;
