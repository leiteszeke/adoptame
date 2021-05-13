import C, { apply, theme } from 'consistencss';
import React from 'react';
import { Image, ImageStyle, Text, TouchableOpacity, View } from 'react-native';
import { PetCardProps } from './PetCard.types';
import { Heart } from 'components/Icons';
import { format, formatDistance } from 'helpers/date';

const PetCard = ({
  containerStyle,
  id,
  name,
  age,
  date,
  image,
  horizontal,
  like,
  owner,
  description,
  onPress,
  location,
}: PetCardProps) => {
  const handlePress = () =>
    onPress?.({
      id,
      name,
      age,
      date: format(date, 't'),
      image,
      like,
      location,
      owner,
      description,
    });

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
        <Image
          source={{ uri: image }}
          borderRadius={8}
          style={apply(C.h30, C.w30) as ImageStyle}
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
              {formatDistance(date, new Date())}
            </Text>
          </View>
          <View style={apply(C.row, C.itemsEnd, C.mt1, C.justifyBetween)}>
            <Text style={apply(C.font3)}>{age}</Text>
            <TouchableOpacity>
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
      <Image
        source={{ uri: image }}
        borderRadius={8}
        style={C.h28 as ImageStyle}
      />
      <View style={apply(C.mt2, C.row, C.itemsCenter, C.justifyBetween)}>
        <Text style={apply(C.familyPopBold, C.font5, C.mr1)} numberOfLines={1}>
          {name}
        </Text>
        <Text style={apply(C.font3)}>{age}</Text>
      </View>
      <Text style={apply(C.font3, C.mt3)} numberOfLines={2}>
        {location ?? ''}
      </Text>
      <View style={apply(C.row, C.itemsCenter, C.mt1, C.justifyBetween)}>
        <Text style={apply(C.font3, C.textDark3)}>
          {formatDistance(date, new Date())}
        </Text>
        <TouchableOpacity>
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
