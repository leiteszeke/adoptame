import { theme } from 'consistencss';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ color = theme.colors.light3 }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.6 0H2.4C1.08 0 0 1.08 0 2.4V24l4.8-4.8h16.8c1.32 0 2.4-1.08 2.4-2.4V2.4C24 1.08 22.92 0 21.6 0zm0 16.8H3.84L2.4 18.24V2.4h19.2v14.4z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
