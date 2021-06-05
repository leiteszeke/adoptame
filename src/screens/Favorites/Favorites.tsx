import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import C, { apply } from 'consistencss';
import PetCard from 'components/PetCard';
import Wrapper from 'components/Wrapper';
import { Menu } from 'components/Icons';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_PETS, Pet } from 'services/pets';
import NotLoggedScreen from 'components/NotLoggedScreen';
import { useUser } from 'hooks/Auth';

const Favorites = () => {
  const user = useUser();
  const navigation = useNavigation();
  const goPet = (petItem: any) => navigation.navigate('Pet', petItem);
  const { data } = useQuery<{ pets: Pet[] }>(GET_PETS, {
    variables: { like: true },
  });

  const openLogin = () => {};

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
    <Wrapper>
      <TouchableOpacity style={apply(C.ml2, C.mt2)} onPress={() => {}}>
        <Menu />
      </TouchableOpacity>
      <View style={apply(C.mx3, C.h12, C.justifyCenter, C.mt2)}>
        <Text style={apply(C.font8, C.textLight3, C.weightBold)}>
          Favoritos
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
            height: '86%',
            bottom: -12,
          },
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={apply(C.pb6)}>
        {data?.pets?.map(pet => (
          <PetCard key={pet._id} horizontal {...pet} onPress={goPet} />
        ))}
      </ScrollView>
    </Wrapper>
  );
};

export default Favorites;
