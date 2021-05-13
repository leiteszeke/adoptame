import React from 'react';
import {
  Dimensions,
  Image,
  ImageStyle,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Wrapper from 'components/Wrapper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Back, Heart, Location } from 'components/Icons';
import C, { apply, theme } from 'consistencss';
import { formatDistance } from 'helpers/date';
import Button from 'components/Button';
import { fromUnixTime } from 'date-fns';

const { width } = Dimensions.get('screen');

const Pet = () => {
  const navigation = useNavigation();
  const { params } = useRoute<any>();
  const imageSize = width - 24;

  const goChat = () =>
    navigation.navigate('ChatStack', {
      screen: 'Chat',
      params: {
        userId: params.owner.id,
        name: params.name,
        chatType: 'adoption',
      },
    });

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
          onPress={() => navigation.goBack()}>
          <Heart
            size={32}
            outline={!params.like}
            color={params.like ? theme.colors.brand2 : theme.colors.dark1}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={apply(C.flex, C.itemsCenter, C.mt2)}>
          <Image
            source={{ uri: params.image }}
            borderRadius={8}
            style={{ height: imageSize, width: imageSize }}
          />
          <View
            style={apply(C.row, C.px3, C.mt4, C.justifyBetween, C.itemsCenter)}>
            <Text
              style={apply(C.font9, C.weightBold, C.flex)}
              numberOfLines={1}>
              {params.name}
            </Text>
            <Text style={apply(C.font4)}>6 meses</Text>
          </View>
          <View style={apply(C.row, C.px3, C.wFull, C.itemsCenter, C.mt3)}>
            <Location color={theme.colors.brand2} />
            <Text style={apply(C.ml1, C.font4)}>{params.location}</Text>
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
              <Image
                source={{ uri: params.owner.image }}
                borderRadius={8}
                style={apply(C.h11, C.w11) as ImageStyle}
              />
            </View>
            <View style={apply(C.flex, C.wFull, C.ml3)}>
              <View style={apply(C.flex, C.row, C.itemsCenter)}>
                <Text
                  style={apply(C.font4, C.line5, C.weightSemiBold, C.flex)}
                  numberOfLines={1}>
                  {params.owner.name}
                </Text>
                <Text style={apply(C.font3, C.textDark3)}>
                  {formatDistance(new Date(), fromUnixTime(params.date))}
                </Text>
              </View>
              <Text style={apply(C.font3, C.line4, C.wFull, C.textDark3)}>
                {params.owner.role}
              </Text>
            </View>
          </View>
          <Text style={apply(C.mx3, C.mt4)}>{params.description}</Text>
        </View>
      </ScrollView>
      <Button onPress={goChat} text="Adoptame" />
    </Wrapper>
  );
};

export default Pet;
