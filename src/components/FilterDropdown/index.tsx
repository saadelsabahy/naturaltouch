import React, {useContext} from 'react';
import {FlatList, I18nManager, StyleSheet, View} from 'react-native';
import {Checkbox, List} from 'react-native-paper';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import {TextInput} from 'react-native-paper';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import reactotron from 'reactotron-react-native';
import {FilterContext} from '../../contexts';
interface Props {
  filterData: string[];
  id: string | number;
  title: string;
  name: string;
}

const FilterDropdown = ({id, filterData, title, name}: Props) => {
  const {onItemPressed, selectedItems, resetSelectedItems} = useContext(
    FilterContext,
  );
  return (
    <List.Accordion id={typeof id == 'number' ? `${id}` : id} title={title}>
      <View style={styles.listItemContainer}>
        <FlatList
          data={filterData}
          contentContainerStyle={{flexGrow: 1}}
          keyExtractor={(item) => `${item.option_value_id}`}
          renderItem={({item, index}) => {
            return (
              <List.Item
                title={`${item.name}`}
                onPress={() =>
                  onItemPressed(item.option_value_id, item.option_id)
                }
                titleStyle={{}}
                style={styles.listItem}
                left={() => (
                  <Checkbox
                    color={COLORS.MAINCOLOR}
                    uncheckedColor={COLORS.GRAY_LIGHT}
                    status={
                      !!(
                        selectedItems[`${item.option_id}`] ==
                        item.option_value_id
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                  />
                )}
              />
            );
          }}
        />
      </View>
    </List.Accordion>
  );
};

export {FilterDropdown};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: COLORS.GRAY_LIGHT,
    marginBottom: 5,
  },
  input: {
    flex: 1,
    height: SCREEN_HEIGHT / 15,
    width: '100%',
    backgroundColor: COLORS.GRAY_LIGHT,
    borderWidth: 0.5,
    borderColor: COLORS.GRAY_LIGHT,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  listItem: {
    //  start: SCREEN_WIDTH * 0.4,
    //width: SCREEN_WIDTH * 0.9,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.GRAY_LIGHT,
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.WHITE,
    height: SCREEN_HEIGHT / 18,
    /* position: 'absolute',
    top: 50,
    start: SCREEN_HEIGHT / 4, */
  },
  listItemContainer: {
    backgroundColor: COLORS.GRAY_LIGHT,
    padding: 3,
    width: SCREEN_WIDTH - 5,
    alignSelf: 'center',
    // maxHeight: SCREEN_HEIGHT / 3,
  },
});
