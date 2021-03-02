import React, {useContext, useMemo} from 'react';
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
import {FilterContext} from '../../contexts';
interface Props {
  filterOptions: [];
  inputsValues: object;
  onChangeText: (text: string, inputName: string) => void;
}

const FilterList = ({filterOptions, onChangeText, inputsValues}: Props) => {
  const {t} = useTranslation();
  const {selectedItems} = useContext(FilterContext);

  const selectedOptions = useMemo(
    () =>
      Object.keys(selectedItems).map((item) =>
        filterOptions.find((option) => option.option_id == item),
      ),
    [selectedItems],
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
              />
            ) : null
          }
          keyExtractor={(item, index) => `${item.option_id}`}
          renderItem={({item, index}) => {
            return (
              <FilterDropdown
                id={index + 1}
                filterData={item.option_values}
                name={item.option_value_id}
                title={item.name}
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
