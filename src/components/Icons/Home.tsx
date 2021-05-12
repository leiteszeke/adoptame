import { theme } from 'consistencss';
import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

function SvgComponent({ color = theme.colors.light3 }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M9.6 22.4v-7.2h4.8v7.2h6v-9.6H24L12 2 0 12.8h3.6v9.6h6z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill={color} d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
