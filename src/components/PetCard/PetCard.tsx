import C, { apply, theme } from 'consistencss';
import React from 'react';
import { Image, ImageStyle, Text, TouchableOpacity, View } from 'react-native';
import { PetCardProps } from './PetCard.types';
import { Heart } from 'components/Icons';
import { formatDistance } from 'helpers/date';
import { SharedElement } from 'react-navigation-shared-element';

const PetCard = ({
  containerStyle,
  id,
  name,
  age,
  date,
  image,
  horizontal,
  like,
  onPress,
  location,
}: PetCardProps) => {
  if (horizontal) {
    return (
      <TouchableOpacity
        onPress={() => onPress?.({ id, image })}
        style={apply(
          C.bgWhite,
          C.row,
          C.wFull,
          C.radius2,
          C.mb3,
          C.p2,
          containerStyle,
        )}>
        <SharedElement id={`item.${id}.photo`}>
          <Image
            source={{ uri: image }}
            borderRadius={8}
            style={apply(C.h30, C.w30) as ImageStyle}
          />
        </SharedElement>
        <View style={apply(C.ml2, C.flex)}>
          <View style={apply(C.flex)}>
            <Text style={apply(C.weightBold, C.font5, C.mr1)} numberOfLines={1}>
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
      onPress={() => onPress?.({ id, image })}
      style={apply(C.bgWhite, C.radius2, C.p2, C.flex, containerStyle)}>
      <SharedElement id={`item.${id}.photo`}>
        <Image
          source={{ uri: image }}
          borderRadius={8}
          style={C.h28 as ImageStyle}
        />
      </SharedElement>
      <View style={apply(C.mt2, C.row, C.itemsCenter, C.justifyBetween)}>
        <Text style={apply(C.weightBold, C.font5, C.mr1)} numberOfLines={1}>
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
