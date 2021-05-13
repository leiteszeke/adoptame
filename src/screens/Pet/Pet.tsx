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
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Back, Heart, Location } from 'components/Icons';
import C, { apply, theme } from 'consistencss';

const { width } = Dimensions.get('screen');

const Pet = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  // @ts-ignore
  const { id, image }: { id: number; image: string } = params;
  const imageSize = width - 24;

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
          <Heart size={32} outline={false} color={theme.colors.brand2} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={apply(C.flex, C.itemsCenter, C.mt2)}>
          <SharedElement id={`item.${id}.photo`}>
            <Image
              source={{ uri: image }}
              borderRadius={8}
              style={{ height: imageSize, width: imageSize }}
            />
          </SharedElement>
          <View
            style={apply(C.row, C.px3, C.mt4, C.justifyBetween, C.itemsCenter)}>
            <Text
              style={apply(C.font9, C.weightBold, C.flex)}
              numberOfLines={1}>
              Charly
            </Text>
            <Text style={apply(C.font4)}>6 meses</Text>
          </View>
          <View style={apply(C.row, C.px3, C.wFull, C.itemsCenter, C.mt3)}>
            <Location color={theme.colors.brand2} />
            <Text style={apply(C.ml1, C.font4)}>Quilmes, Bs. As.</Text>
          </View>
          <View style={apply(C.row, C.wrap, C.wFull, C.px3, C.mt5)}>
            <View
              style={apply(
                C.h12,
                C.w12,
                C.radius2,
                C.borderDouble,
                C.borderBrand2,
              )}>
              <Image
                source={{ uri: 'https://picsum.photos/id/2/250/250' }}
                borderRadius={8}
                style={apply(C.h11, C.w11) as ImageStyle}
              />
            </View>
            <View style={apply(C.flex, C.wFull, C.ml3)}>
              <View style={apply(C.flex, C.row, C.itemsCenter)}>
                <Text
                  style={apply(C.font4, C.line5, C.weightSemiBold, C.flex)}
                  numberOfLines={1}>
                  John Doe
                </Text>
                <Text style={apply(C.font3, C.textDark3)}>Dueño</Text>
              </View>
              <Text style={apply(C.font3, C.line4, C.wFull, C.textDark3)}>
                Dueño
              </Text>
            </View>
          </View>
          <Text style={apply(C.mx3, C.mt4)}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nam
            massa nullam neque morbi ut quis. Risus tortor, at morbi sit orci
            dictum at. Rhoncus eget non senectus ultrices ut dui, nisl aliquam.
            Ac ornare enim, in platea nunc ipsum sodales.
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={apply(
          C.mx3,
          C.h13,
          C.justifyCenter,
          C.itemsCenter,
          C.bgBrand2,
          C.radius4,
          C.mt2,
        )}>
        <Text style={apply(C.textWhite, C.weightSemiBold, C.font6)}>
          Adoptame
        </Text>
      </TouchableOpacity>
    </Wrapper>
  );
};

export default Pet;
