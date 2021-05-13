import { theme } from 'consistencss';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ color = theme.colors.light3, size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10 14L21 3M21 3l-6.5 18a.55.55 0 01-1 0L10 14l-7-3.5a.55.55 0 010-1L21 3z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
