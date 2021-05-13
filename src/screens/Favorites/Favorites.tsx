import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import C, { apply } from 'consistencss';
import PetCard from 'components/PetCard';
import Wrapper from 'components/Wrapper';
import { Menu } from 'components/Icons';

const pet = {
  name: 'Henry',
  date: new Date(2020, 1, 1),
  location: 'Fcio. Varela, Buenos Aires',
  age: '2 años',
  image: 'https://picsum.photos/id/10/250/250',
};

const pets = [1, 2, 3, 4, 5, 6, 7, 8];

const Favorites = () => {
  const goPet = () => {};

  return (
    <Wrapper>
      <TouchableOpacity style={apply(C.ml2, C.mt2)} onPress={() => {}}>
        <Menu />
      </TouchableOpacity>
      <View style={apply(C.mx3, C.h12, C.justifyCenter, C.mt2)}>
        <Text style={apply(C.font8, C.textWhite, C.weightBold)}>Favoritos</Text>
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
        {pets.map(petI => {
          return (
            <PetCard
              horizontal
              {...pet}
              id={petI}
              like={true}
              onPress={goPet}
            />
          );
        })}
      </ScrollView>
    </Wrapper>
  );
};

export default Favorites;
