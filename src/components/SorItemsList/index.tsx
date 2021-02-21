import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SORT_OPTIONS} from '../../constants/mockData';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {CustomText} from '../customText';

export interface sortItem {
  name: string;
  sort_criteria: string;
  sort_order: string;
}
interface Props {
  selected: sortItem;
  data: any[];
  onItemPressed: (item: sortItem) => void;
}

const SortItemsList = ({selected, data, onItemPressed}: Props) => {
  return (
    <FlatList
      data={SORT_OPTIONS}
      keyExtractor={(_, index) => `${index}`}
      renderItem={({item, index}) => {
        return (
          <Pressable
            onPress={() => onItemPressed(item)}
            style={({pressed}) => [styles.item, {opacity: pressed ? 0.5 : 1}]}>
            <CustomText text={item.name} />
            <View
              style={[
                COMMON_STYLES.dot,
                {
                  backgroundColor:
                    selected.name == item.name
                      ? COLORS.MAINCOLOR
                      : COLORS.GRAY_LIGHT,
                },
              ]}
            />
          </Pressable>
        );
      }}
    />
  );
};

export {SortItemsList};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderColor: COLORS.GRAY_LIGHT,
  },
});
