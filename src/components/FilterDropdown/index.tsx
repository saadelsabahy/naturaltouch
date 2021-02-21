import React from 'react';
import {FlatList, I18nManager, StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import {TextInput} from 'react-native-paper';
import {COLORS, COMMON_STYLES} from '../../constants/style';
interface Props {
  filterData: string[];
  id: string | number;
  title: string;
  onItemPressed: (item: string, title: string) => void;
  selectedItems: object;
  name: string;
}

const FilterDropdown = ({
  id,
  filterData,
  title,
  onItemPressed,
  selectedItems,
  name,
}: Props) => {
  return (
    <View style={styles.container}>
      <List.Accordion
        id={typeof id == 'number' ? `${id}` : id}
        title={title}
        style={COMMON_STYLES.filterAccordionHeader}>
        <View style={styles.listItemContainer}>
          <FlatList
            data={filterData}
            contentContainerStyle={{flexGrow: 1}}
            keyExtractor={(item) => `${item.option_value_id}`}
            renderItem={({item, index}) => {
              console.log(selectedItems, item.option_id, item.option_value_id);
              return (
                <List.Item
                  title={`${item.name}`}
                  onPress={() =>
                    onItemPressed(item.option_value_id, item.option_id)
                  }
                  titleStyle={{}}
                  style={styles.listItem}
                  right={() => (
                    <View
                      style={[
                        COMMON_STYLES.dot,
                        {
                          backgroundColor: !!(
                            selectedItems[`${item.option_id}`] ==
                            item.option_value_id
                          )
                            ? COLORS.MAINCOLOR
                            : COLORS.GRAY_LIGHT,
                          alignSelf: 'center',
                        },
                      ]}
                    />
                  )}
                />
              );
            }}
          />
        </View>
      </List.Accordion>

      <TextInput
        style={styles.input}
        editable={false}
        value={selectedItems[`${filterData[0].option_id}`]}
      />
    </View>
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
    height: SCREEN_HEIGHT / 20,
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
