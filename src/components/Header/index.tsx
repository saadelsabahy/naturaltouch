import React from 'react';
import {View, ViewStyle, Pressable, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {HomeHeader} from './HomeHeader';
import {ScreenHeader} from './ScreenHeader';

interface Props extends ViewStyle {
  home?: boolean;
  onAccountPressed?: () => void;
  onMenuPressed?: () => void;
  search?: boolean;
  title?: string;
  useMainColor?: boolean;
  code?: boolean;
}

const CustomHeader = ({
  home,
  onAccountPressed,
  onMenuPressed,
  search,
  title,
  useMainColor,
  code,
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
      {!!code && (
        <Pressable
          style={styles.codeContainer}
          onPress={() => console.log('code')}>
          <Text style={styles.codeText}>{code}</Text>
        </Pressable>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  codeContainer: {
    backgroundColor: COLORS.MOCK_BG_RED,
    justifyContent: 'center',
    padding: 3,
  },
  codeText: {
    color: COLORS.WHITE,
    textTransform: 'capitalize',
  },
});

export {CustomHeader};
