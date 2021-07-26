import React, { useEffect } from 'react';
import PetCard from 'components/PetCard';
import Wrapper, { WrapperContentType } from 'components/Wrapper';
import Icons from 'components/Icons';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_PETS, Pet } from 'services/pets';
import NotLoggedScreen from 'components/NotLoggedScreen';
import { useUser } from 'hooks/Auth';
import NoResultsScreen from 'components/NoResultsScreen';
import { DogWalking } from 'components/Illustrations';
import Routes from 'routes';

const Favorites = () => {
  const user = useUser();
  const { navigate } = useNavigation();
  const goPet = (petItem: any) => navigate(Routes.Pet, petItem);
  const { data, refetch } = useQuery<{ pets: Pet[] }>(GET_PETS, {
    variables: { like: true },
  });

  const openLogin = () => navigate(Routes.Login);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  if (!user) {
    return (
      <NotLoggedScreen
        message="Necesitamos saber quien esos para poder mostrarte tus favoritos"
        buttonText="Ingresar"
        onPress={openLogin}
      />
    );
  }

  return (
    <Wrapper
      type={WrapperContentType.Scroll}
      contentProps={{
        leftIcon: Icons.Menu,
        leftIconPress: () => {},
        title: 'Favoritos',
        isEmpty: data?.pets.length === 0,
      }}>
      {data?.pets.length === 0 && (
        <NoResultsScreen
          component={DogWalking}
          message={'No hay resultados para tu búsqueda.'}
        />
      )}
      {data?.pets?.map(pet => (
        <PetCard key={pet._id} horizontal {...pet} onPress={goPet} />
      ))}
    </Wrapper>
  );
};

export default Favorites;
