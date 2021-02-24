import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {HomeHeader} from './HomeHeader';
import {ScreenHeader} from './ScreenHeader';

interface Props extends ViewStyle {
  home?: boolean;
  onAccountPressed?: () => void;
  onMenuPressed?: () => void;
  search?: boolean;
  title?: string;
  useMainColor?: boolean;
}

const CustomHeader = ({
  home,
  onAccountPressed,
  onMenuPressed,
  search,
  title,
  useMainColor,
  ...props
}: Props) => {
  return (
    <View>
      {!title ? (
        <HomeHeader
          onAccountPressed={onAccountPressed}
          onMenuPressed={onMenuPressed}
          home={home}
          {...props}
        />
      ) : (
        <ScreenHeader
          search={search}
          title={title}
          {...props}
          useMainColor={true}
        />
      )}
    </View>
  );
};

export {CustomHeader};
