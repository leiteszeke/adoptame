import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import C, { apply, theme } from 'consistencss';
import PetCard, { EmptyPetCard } from 'components/PetCard';
import Wrapper from 'components/Wrapper';
import { Menu, Search } from 'components/Icons';
import { useNavigation } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import { useQuery } from '@apollo/client';
import { GET_PETS, Pet } from 'services/pets';
import { chunk, debounce } from 'lodash';
import { DogWalking } from 'components/Illustrations';
import NoResultsScreen from 'components/NoResultsScreen';

const Home = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState<string>('');
  const { data, refetch } = useQuery<{ pets: Pet[] }>(GET_PETS, {
    variables: { name: search },
  });

  const goPet = (item: any) => navigation.navigate('Pet', item);

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
    <Wrapper>
      <TouchableOpacity style={apply(C.ml2, C.mt2)} onPress={openDrawer}>
        <Menu />
      </TouchableOpacity>
      <View
        style={apply(
          C.mx3,
          C.row,
          C.h12,
          C.itemsCenter,
          C.bgLight3,
          C.radius3,
          C.mt2,
          C.px3,
        )}>
        <Search color={theme.colors.dark3} />
        <TextInput
          style={apply(C.hFull, C.flex, C.px4, C.italic)}
          placeholderTextColor={theme.colors.dark3}
          placeholder="Buscá tu mascota..."
          onChangeText={handleSearch}
        />
      </View>
      <ScrollView
        style={apply(
          C.radiustop4,
          C.bgLight1,
          C.absolute,
          C.wFull,
          C.py3,
          C.px4,
          C.row,
          C.wrap,
          {
            height: '86%',
            bottom: -12,
          },
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={apply(C.flex, C.pb14)}>
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
      </ScrollView>
    </Wrapper>
  );
};

export default Home;
