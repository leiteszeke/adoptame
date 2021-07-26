import { theme } from 'consistencss';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Menu = ({ color = theme.colors.light3, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <Path
      d="M27 10.5h-7.5a1.5 1.5 0 100 3H27a1.5 1.5 0 100-3zm-10.5 12H9a1.5 1.5 0 100 3h7.5a1.5 1.5 0 100-3zm10.5-6H9a1.5 1.5 0 100 3h18a1.5 1.5 0 100-3z"
      fill={color}
    />
  </Svg>
);

export default Menu;
