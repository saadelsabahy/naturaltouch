import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {List} from 'react-native-paper';
import {FilterSelectedItemes} from '../../interfaces/categories';
import {FilterDropdown} from '../FilterDropdown';
import {useTranslation} from 'react-i18next';
import FilterFromTo from '../FilterFromTo';
import {COLORS} from '../../constants/style';
import reactotron from 'reactotron-react-native';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import SelectedFilters from './SelectedFilters';
interface Props {
  selectedItems: object;
  onItemPressed: (item: string, title: string) => void;
  filterOptions: [];
  inputsValues: object;
  onChangeText: (text: string, inputName: string) => void;
  resetFilters: () => void;
}

const FilterList = ({
  onItemPressed,
  selectedItems,
  filterOptions,
  onChangeText,
  inputsValues,
  resetFilters,
}: Props) => {
  const {t, i18n} = useTranslation();
  reactotron.log({selectedItems});
  const selectedOptions = Object.keys(selectedItems).map((item) =>
    filterOptions.find((option) => option.option_id == item),
  );

  return (
    <View style={{flex: 1, backgroundColor: COLORS.WHITE}}>
      <List.AccordionGroup>
        <FlatList
          data={filterOptions}
          ListHeaderComponent={
            !!selectedOptions.filter((x) => x).length ? (
              <SelectedFilters
                selectedOptions={selectedOptions.filter((x) => x)}
                selectedItems={selectedItems}
                resetFilters={resetFilters}
                onItemPressed={onItemPressed}
              />
            ) : null
          }
          keyExtractor={(item, index) => `${item.option_id}`}
          renderItem={({item, index}) => {
            return (
              <FilterDropdown
                id={index + 1}
                filterData={item.option_values}
                onItemPressed={onItemPressed}
                name={item.option_value_id}
                title={item.name}
                selectedItems={selectedItems}
              />
            );
          }}
        />
      </List.AccordionGroup>
    </View>
  );
};

export {FilterList};

const styles = StyleSheet.create({});
