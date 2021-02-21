import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';
interface Props {
  grid?: boolean;
  onFilterPressed?: () => void;
  onSortPressed?: () => void;
  onGridPressed?: () => void;
  gridIcon?: string;
}
const BUTTON_THEME = {colors: {primary: COLORS.GRAY}};
const CategorySubHeader = ({
  grid,
  onGridPressed,
  onFilterPressed,
  onSortPressed,
  gridIcon,
}: Props) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.container]}>
      {grid && (
        <Pressable
          onPress={onGridPressed}
          style={({pressed}) => [
            styles.pressable,
            {opacity: pressed ? 0.7 : 1},
          ]}>
          <Button theme={BUTTON_THEME}>
            <Icon name={grid && gridIcon} size={25} />
          </Button>
        </Pressable>
      )}
      <Pressable
        onPress={onSortPressed}
        style={({pressed}) => [styles.pressable, {opacity: pressed ? 0.7 : 1}]}>
        <Button
          theme={BUTTON_THEME}
          icon={() => (
            <Icon name="swap-vertical" size={25} color={COLORS.GRAY} />
          )}>
          {t('categoriesDetailesScreen:sort')}
        </Button>
      </Pressable>
      <Pressable
        onPress={onFilterPressed}
        style={({pressed}) => [styles.pressable, {opacity: pressed ? 0.7 : 1}]}>
        <Button
          theme={BUTTON_THEME}
          icon={() => (
            <Icon name="filter-outline" color={COLORS.GRAY} size={25} />
          )}>
          {t('categoriesDetailesScreen:filter')}
        </Button>
      </Pressable>
    </View>
  );
};

export {CategorySubHeader};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
  },
  pressable: {
    flex: 1,
    borderEndWidth: 2,
    borderEndColor: COLORS.GRAY_LIGHT,
  },
});
