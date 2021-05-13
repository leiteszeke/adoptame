import { theme } from 'consistencss';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ color = theme.colors.light3, size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 22" fill="none">
      <Path
        d="M22.5 9.002H4.71l5.445-6.54a1.502 1.502 0 10-2.31-1.92l-7.5 9c-.05.071-.096.147-.135.225 0 .075 0 .12-.105.195a1.5 1.5 0 00-.105.54 1.5 1.5 0 00.105.54c0 .075 0 .12.105.195.04.078.085.153.135.225l7.5 9a1.5 1.5 0 001.155.54 1.5 1.5 0 001.155-2.46l-5.445-6.54H22.5a1.5 1.5 0 000-3z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
