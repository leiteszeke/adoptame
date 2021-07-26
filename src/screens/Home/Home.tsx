import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import C, { apply } from 'consistencss';
import PetCard, { EmptyPetCard } from 'components/PetCard';
import Wrapper, { WrapperContentType } from 'components/Wrapper';
import Icons from 'components/Icons';
import { useNavigation } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import { useQuery } from '@apollo/client';
import { GET_PETS, Pet } from 'services/pets';
import { chunk, debounce } from 'lodash';
import { DogWalking } from 'components/Illustrations';
import NoResultsScreen from 'components/NoResultsScreen';
import Routes from 'routes';

const Home = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState<string>('');
  const { data, refetch } = useQuery<{ pets: Pet[] }>(GET_PETS, {
    variables: { name: search },
  });

  const goPet = (item: any) => navigation.navigate(Routes.Pet, item);

  const openDrawer = () => {
    EventRegister.emit('toggleDrawer');
  };

  const onSearch = (value: string) => setSearch(value);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(debounce(onSearch, 2000), []);

  const pets = useMemo(() => {
    if (!data || !data?.pets) {
      return [];
    }

    const chunked: Array<Pet | null>[] = chunk(data?.pets, 2);

    chunked.forEach(chunky => {
      if (chunky.length === 1) {
        chunky.push(null);
      }
    });

    return chunked;
  }, [data]);

  useEffect(() => {
    refetch();
  }, [refetch, search]);

  return (
    <Wrapper
      type={WrapperContentType.Scroll}
      contentProps={{
        leftIcon: Icons.Menu,
        leftIconPress: openDrawer,
        onSearch: handleSearch,
        isEmpty: pets.length === 0,
      }}>
      {pets.length === 0 && (
        <NoResultsScreen
          component={DogWalking}
          message={
            search.length === 0
              ? 'De momento, no tenemos mascotas en adopción.'
              : 'No hay resultados para tu búsqueda.'
          }
        />
      )}

      {pets.map((petRow, petIndex) => (
        <View
          key={petIndex}
          style={apply(C.row, C.itemsStart, C.mb4, C.justifyBetween)}>
          {petRow.map((pet, index) => {
            if (!pet) {
              return <EmptyPetCard key={index} />;
            }

            if (index % 2 === 0) {
              return <PetCard {...pet} key={pet._id} onPress={goPet} />;
            }

            return (
              <PetCard
                containerStyle={apply(C.top8, C.ml4) as ViewStyle}
                {...pet}
                key={pet._id}
                onPress={goPet}
              />
            );
          })}
        </View>
      ))}
    </Wrapper>
  );
};

export default Home;
