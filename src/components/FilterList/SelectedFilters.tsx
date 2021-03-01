import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import reactotron from '../../../ReactotronConfig';
import {COLORS} from '../../constants/style';
import {SCREEN_WIDTH} from '../../constants/style/sizes';

interface Props {
  selectedOptions: any[];
  selectedItems: object;
  resetFilters: () => void;
  onItemPressed: (item: string, title: string) => void;
}

const SelectedFilters = ({
  selectedOptions,
  selectedItems,
  resetFilters,
  onItemPressed,
}: Props) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{textTransform: 'capitalize'}}>
          {t(`categoriesDetailesScreen:selectedFilters`)}
        </Text>
        <Button onPress={resetFilters}>
          {t(`categoriesDetailesScreen:reset`)}
        </Button>
      </View>
      {selectedOptions.map((option, index) => {
        const filter = option.option_values.find(
          (filter) => filter.option_value_id == selectedItems[option.option_id],
        );

        return (
          <View key={index} style={styles.filterItem}>
            <Text style={{color: COLORS.MAINCOLOR}}>{option?.name} :</Text>
            <Text>{filter?.name}</Text>
            <IconButton
              icon="close"
              style={{margin: 0}}
              onPress={() =>
                onItemPressed(filter.option_value_id, option.option_id)
              }
            />
          </View>
        );
      })}
    </View>
  );
};

export default SelectedFilters;

const styles = StyleSheet.create({
  container: {flex: 1, width: SCREEN_WIDTH * 0.95, alignSelf: 'center'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterItem: {
    maxWidth: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 0.2,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    marginBottom: 3,
  },
});
