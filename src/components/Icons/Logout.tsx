import { theme } from 'consistencss';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Logout = ({ color = theme.colors.light3, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 17v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h9a2 2 0 012 2v2h-2V5H4v14h9v-2h2zm2.5-10.5l-1.414 1.414L19.172 11H9v2h10.172l-3.086 3.086L17.5 17.5 23 12l-5.5-5.5z"
      fill={color}
    />
  </Svg>
);

export default Logout;
