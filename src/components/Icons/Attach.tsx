import { theme } from 'consistencss';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent({ color = theme.colors.light3, size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.463 5.576c-.688-.75-1.929-.796-2.756.031l-8.1 8.1c-.21.21-.21.476 0 .686.21.21.476.21.686 0l6.7-6.7a1 1 0 011.414 1.414l-6.7 6.7a2.45 2.45 0 01-3.514 0 2.45 2.45 0 010-3.514l8.1-8.1c1.567-1.568 4.115-1.619 5.63.015 1.552 1.569 1.597 4.104-.03 5.613l-9.486 9.486c-2.19 2.19-5.624 2.19-7.814 0-2.19-2.19-2.19-5.624 0-7.814l8.1-8.1a1 1 0 011.414 1.414l-8.1 8.1c-1.41 1.41-1.41 3.576 0 4.986 1.41 1.41 3.576 1.41 4.986 0l9.5-9.5.031-.03c.75-.687.796-1.929-.031-2.756l-.03-.031z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
