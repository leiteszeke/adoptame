import C, { apply, theme } from 'consistencss';
import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { PetCardProps } from './PetCard.types';
import { Heart } from 'components/Icons';
import { formatDistanceStrict } from 'helpers/date';
import { useMutation } from '@apollo/client';
import { CREATE_PET_LIKE, DELETE_PET_LIKE } from 'services/petLikes';
import { GET_PETS } from 'services/pets';

export const EmptyPetCard = ({ horizontal = false }) =>
  horizontal ? (
    <View style={apply(C.row, C.wFull, C.radius2, C.mb3, C.p2)} />
  ) : (
    <View style={apply(C.radius2, C.p2, C.flex)} />
  );

const PetCard = ({
  containerStyle,
  _id,
  name,
  birth,
  publishedAt,
  photos,
  horizontal,
  like,
  type,
  owner,
  description,
  onPress,
  location,
}: PetCardProps) => {
  const [likeMutation] = useMutation(like ? DELETE_PET_LIKE : CREATE_PET_LIKE, {
    refetchQueries: [
      { query: GET_PETS },
      { query: GET_PETS, variables: { like: true } },
    ],
  });

  const handlePress = () =>
    onPress?.({
      _id,
      name,
      birth,
      publishedAt,
      photos,
      like,
      location,
      owner,
      description,
      type,
    });

  const toggleLike = async () => {
    likeMutation({ variables: { petId: _id } });
  };

  const innerImage = useMemo(() => {
    if (photos.length > 0) {
      return { uri: photos[0] };
    }

    return { uri: type.image };
  }, [photos, type.image]);

  if (horizontal) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        style={apply(
          C.bgLight3,
          C.row,
          C.wFull,
          C.radius2,
          C.mb3,
          C.p2,
          containerStyle,
        )}>
        <FastImage
          source={innerImage}
          style={apply(C.h30, C.radius2, C.w30) as ImageStyle}
        />
        <View style={apply(C.ml2, C.flex)}>
          <View style={apply(C.flex)}>
            <Text
              style={apply(C.font5, C.mr1, C.familyPopBold)}
              numberOfLines={1}>
              {name}
            </Text>
            <Text style={apply(C.font3, C.mt3)} numberOfLines={2}>
              {location ?? ''}
            </Text>
            <Text style={apply(C.font3, C.textDark3)}>
              {formatDistanceStrict(new Date(publishedAt), new Date())}
            </Text>
          </View>
          <View style={apply(C.row, C.itemsEnd, C.mt1, C.justifyBetween)}>
            <Text style={apply(C.font3)}>
              {birth ? formatDistanceStrict(new Date(birth), new Date()) : ''}
            </Text>
            <TouchableOpacity onPress={toggleLike}>
              <Heart
                color={like ? theme.colors.brand2 : theme.colors.dark1}
                size={24}
                outline={!like}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={apply(C.bgLight3, C.radius2, C.p2, C.flex, containerStyle)}>
      <FastImage
        source={innerImage}
        style={apply(C.h28, C.radius2) as ImageStyle}
      />
      <View style={apply(C.mt2, C.row, C.itemsCenter, C.justifyBetween)}>
        <Text style={apply(C.familyPopBold, C.font5, C.mr1)} numberOfLines={1}>
          {name}
        </Text>
        <Text style={apply(C.font3)}>
          {birth ? formatDistanceStrict(new Date(birth), new Date()) : ''}
        </Text>
      </View>
      <Text style={apply(C.font3, C.mt3)} numberOfLines={2}>
        {location ?? ''}
      </Text>
      <View style={apply(C.row, C.itemsCenter, C.mt1, C.justifyBetween)}>
        <Text style={apply(C.font3, C.textDark3)}>
          {formatDistanceStrict(new Date(publishedAt), new Date())}
        </Text>
        <TouchableOpacity onPress={toggleLike}>
          <Heart
            color={like ? theme.colors.brand2 : theme.colors.dark1}
            size={16}
            outline={!like}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PetCard;
