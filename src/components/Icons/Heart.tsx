import { theme } from 'consistencss';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Heart = ({ color = theme.colors.light3, size = 24, outline = true }) => {
  if (!outline) {
    return (
      <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <Path
          d="M14.422 4.596a3.932 3.932 0 00-.89-1.252 4.145 4.145 0 00-1.312-.84 4.267 4.267 0 00-1.6-.306A4.278 4.278 0 008 3.092c-.14-.11-.29-.212-.445-.304a4.278 4.278 0 00-2.175-.59c-.555 0-1.093.103-1.6.307-.49.196-.933.48-1.313.84-.378.356-.68.781-.889 1.251a3.77 3.77 0 00-.328 1.54c0 .504.106 1.029.317 1.563.177.446.43.908.753 1.375.513.74 1.218 1.51 2.092 2.293a23.322 23.322 0 002.947 2.227l.37.23a.516.516 0 00.54 0l.37-.23c.061-.038 1.495-.932 2.947-2.227.875-.782 1.58-1.553 2.092-2.293.324-.467.578-.93.753-1.375a4.25 4.25 0 00.317-1.562 3.742 3.742 0 00-.326-1.541z"
          fill={color}
        />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.633 6.647a6.093 6.093 0 00-1.334-1.94A6.219 6.219 0 0015.93 2.93 6.26 6.26 0 0012 4.315 6.26 6.26 0 008.07 2.93 6.219 6.219 0 003.7 4.706a6.057 6.057 0 00-1.825 4.33c0 .78.16 1.593.476 2.42.265.692.644 1.409 1.13 2.133.768 1.146 1.825 2.341 3.138 3.553a35.071 35.071 0 004.42 3.453l.556.356a.753.753 0 00.808 0l.556-.357a35.517 35.517 0 004.42-3.452c1.312-1.211 2.37-2.407 3.138-3.553.485-.724.867-1.441 1.13-2.133.316-.827.476-1.64.476-2.42a5.968 5.968 0 00-.49-2.39zM12 19.097S3.656 13.75 3.656 9.035c0-2.388 1.976-4.324 4.414-4.324 1.713 0 3.199.956 3.93 2.353a4.426 4.426 0 013.93-2.353c2.438 0 4.414 1.936 4.414 4.324 0 4.716-8.344 10.062-8.344 10.062z"
        fill={color}
      />
    </Svg>
  );
};

export default Heart;
