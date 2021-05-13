import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import C, { apply } from 'consistencss';
import PetCard from 'components/PetCard';
import Wrapper from 'components/Wrapper';
import { Menu } from 'components/Icons';
import { useNavigation } from '@react-navigation/native';

const pet = {
  name: 'Henry',
  date: new Date(2020, 1, 1),
  location: 'Fcio. Varela, Buenos Aires',
  age: '2 años',
  image: 'https://picsum.photos/id/10/250/250',
  owner: {
    name: 'John Doe',
    image: 'https://picsum.photos/id/1/250/250',
    role: 'Dueño',
    id: 1,
  },
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nam massa nullam neque morbi ut quis. Risus tortor, at morbi sit orci dictum at. Rhoncus eget non senectus ultrices ut dui, nisl aliquam. Ac ornare enim, in platea nunc ipsum sodales.',
};

const pets = [1, 2, 3, 4, 5, 6, 7, 8];

const Favorites = () => {
  const navigation = useNavigation();
  const goPet = (petItem: any) => navigation.navigate('Pet', petItem);

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
        {pets.map(petI => {
          return (
            <PetCard
              horizontal
              {...pet}
              key={petI}
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
