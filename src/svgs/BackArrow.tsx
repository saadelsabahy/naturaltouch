import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {COLORS} from '../constants/style';
interface props extends SvgProps {
  fill?: string;
}
function BackArrow({fill, ...props}: props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 443.52 443.52"
      fill={fill || COLORS.GRAY}
      width={37}
      height={20}
      {...props}>
      <Path d="M143.492 221.863L336.226 29.129c6.663-6.664 6.663-17.468 0-24.132-6.665-6.662-17.468-6.662-24.132 0l-204.8 204.8c-6.662 6.664-6.662 17.468 0 24.132l204.8 204.8c6.78 6.548 17.584 6.36 24.132-.42 6.387-6.614 6.387-17.099 0-23.712L143.492 221.863z" />
    </Svg>
  );
}

export {BackArrow};
