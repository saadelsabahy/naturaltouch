import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/style';

interface Props {}

const ColorsBackground = (props: Props) => {
  return (
    <View
      style={{
        width: '100%',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        height: '100%',
        zIndex: 0,
      }}>
      <View
        style={[
          styles.colorsBackgroundContainer,
          {backgroundColor: COLORS.MOCK_BG_RED},
        ]}
      />
      <View
        style={[
          styles.colorsBackgroundContainer,
          {backgroundColor: COLORS.MOCK_BG_ORANGE},
        ]}
      />
      <View
        style={[
          styles.colorsBackgroundContainer,
          {backgroundColor: COLORS.MOCK_BG_GRAY},
        ]}
      />
      <View
        style={[
          styles.colorsBackgroundContainer,
          {backgroundColor: COLORS.MOCK_BG_CYAN},
        ]}
      />
      <View
        style={[
          styles.colorsBackgroundContainer,
          {backgroundColor: COLORS.MOCK_BG_YELLOW},
        ]}
      />
    </View>
  );
};

export {ColorsBackground};

const styles = StyleSheet.create({
  colorsBackgroundContainer: {
    flex: 1,
  },
});
