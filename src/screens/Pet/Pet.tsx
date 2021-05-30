import React, { useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Wrapper from 'components/Wrapper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Back, Heart, Location } from 'components/Icons';
import C, { apply, theme } from 'consistencss';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { formatDistanceStrict } from 'helpers/date';
import Button from 'components/Button';
import { useMutation } from '@apollo/client';
import { CREATE_PET_LIKE, DELETE_PET_LIKE } from 'services/petLikes';
import { Pet } from 'services/pets';

const { width } = Dimensions.get('screen');

const PetScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute<any>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [likeMutation] = useMutation(
    pet?.like ? DELETE_PET_LIKE : CREATE_PET_LIKE,
  );
  const imageSize = width - 24;

  const goChat = () =>
    navigation.navigate('ChatStack', {
      screen: 'Chat',
      params: {
        userId: pet?.owner.id,
        name: pet?.name,
        chatType: 'adoption',
      },
    });

  const toggleLike = async () => {
    const mutation = await likeMutation({ variables: { petId: pet?.id } });

    if (mutation.data.pet) {
      setPet(mutation.data.pet);
    }
  };

  const ownerImage = useMemo(() => {
    if (pet?.owner?.image) {
      return { uri: pet.owner.image };
    }

    return {
      uri: 'https://res.cloudinary.com/leiteszeke/image/upload/v1622408932/adoptame/placeholders/user-placeholder_kqkzxz.png',
    };
  }, [pet]);

  const petImage = useMemo(() => {
    if (!pet) {
      return {
        uri: 'https://res.cloudinary.com/leiteszeke/image/upload/v1622408979/adoptame/placeholders/dog-placeholder_famgpe.png',
      };
    }

    if (pet.photos?.length > 0) {
      return { uri: pet.photos[0] };
    }

    return { uri: pet.type.image };
  }, [pet]);

  useEffect(() => {
    setPet(params);
  }, [params]);

  if (!pet) {
    return null;
  }

  return (
    <Wrapper containerStyle={C.bgLight1} withTabs={false}>
      <View style={apply(C.row, C.justifyBetween)}>
        <TouchableOpacity
          style={apply(C.ml3, C.mt3, C.h9, C.w9)}
          onPress={() => navigation.goBack()}>
          <Back color={theme.colors.dark1} />
        </TouchableOpacity>
        <TouchableOpacity
          style={apply(C.mr3, C.mt3, C.h9, C.w9)}
          onPress={toggleLike}>
          <Heart
            size={32}
            outline={!pet.like}
            color={pet.like ? theme.colors.brand2 : theme.colors.dark1}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={apply(C.flex, C.itemsCenter, C.mt2)}>
          <FastImage
            source={petImage}
            style={
              apply(C.radius2, {
                height: imageSize,
                width: imageSize,
              }) as ImageStyle
            }
          />
          <View
            style={apply(C.row, C.px3, C.mt4, C.justifyBetween, C.itemsCenter)}>
            <Text
              style={apply(C.font9, C.weightBold, C.flex)}
              numberOfLines={1}>
              {pet.name}
            </Text>
            <Text style={apply(C.font4)}>
              {pet.birth
                ? formatDistanceStrict(new Date(pet.birth), new Date())
                : ''}
            </Text>
          </View>
          <View style={apply(C.row, C.px3, C.wFull, C.itemsCenter, C.mt3)}>
            <Location color={theme.colors.brand2} />
            <Text style={apply(C.ml1, C.font4)}>{pet.location}</Text>
          </View>
          <View style={apply(C.row, C.wrap, C.wFull, C.px3, C.mt5)}>
            <View
              style={apply(
                C.h12,
                C.w12,
                C.radius2,
                C.itemsCenter,
                C.justifyCenter,
                C.bgBrand2,
              )}>
              <FastImage
                source={ownerImage}
                style={apply(C.h11, C.w11, C.radius2) as ImageStyle}
              />
            </View>
            <View style={apply(C.flex, C.wFull, C.ml3)}>
              <View style={apply(C.flex, C.row, C.itemsCenter)}>
                <Text
                  style={apply(C.font4, C.line5, C.weightSemiBold, C.flex)}
                  numberOfLines={1}>
                  {pet.owner.name}
                </Text>
                <Text style={apply(C.font3, C.textDark3)}>
                  {formatDistanceStrict(new Date(pet.publishedAt), new Date())}
                </Text>
              </View>
              <Text style={apply(C.font3, C.line4, C.wFull, C.textDark3)}>
                {pet.owner.role}
              </Text>
            </View>
          </View>
          <Text style={apply(C.mx3, C.mt4)}>{pet.description}</Text>
        </View>
      </ScrollView>
      <Button onPress={goChat} text="Adoptame" />
    </Wrapper>
  );
};

export default PetScreen;
