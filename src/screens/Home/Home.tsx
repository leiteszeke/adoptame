import React from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import C, { apply, theme } from 'consistencss';
import PetCard from 'components/PetCard';
import Wrapper from 'components/Wrapper';
import { Menu, Search } from 'components/Icons';
import { useNavigation } from '@react-navigation/native';

const pet = {
  name: 'Henry',
  date: new Date(2020, 1, 1),
  location: 'Fcio. Varela, Buenos Aires',
  age: '2 años',
  image: 'https://picsum.photos/id/10/250/250',
};

const pets = [
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 8],
];

const Home = () => {
  const navigation = useNavigation();

  const goPet = (item: any) => {
    navigation.navigate('Pet', { id: item.id, image: item.image });
  };

  return (
    <Wrapper>
      <TouchableOpacity style={apply(C.ml2, C.mt2)} onPress={() => {}}>
        <Menu />
      </TouchableOpacity>
      <View
        style={apply(
          C.mx3,
          C.row,
          C.h12,
          C.itemsCenter,
          C.bgWhite,
          C.radius3,
          C.mt2,
          C.px3,
        )}>
        <Search color={theme.colors.dark3} />
        <TextInput
          style={apply(C.hFull, C.flex, C.px4, C.italic)}
          placeholderTextColor={theme.colors.dark3}
          placeholder="Buscá tu mascota..."
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
        {pets.map((petRow, petIndex) => (
          <View
            key={petIndex}
            style={apply(C.row, C.itemsStart, C.mb4, C.justifyBetween)}>
            {petRow.map((petI, index) => {
              if (index % 2 === 0) {
                return (
                  <PetCard
                    {...pet}
                    id={petI}
                    key={index}
                    like={true}
                    onPress={goPet}
                  />
                );
              }

              return (
                <PetCard
                  containerStyle={apply(C.top8, C.ml4) as ViewStyle}
                  {...pet}
                  key={index}
                  id={petI}
                  like={false}
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