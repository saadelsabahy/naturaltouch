import React from 'react';
import {FlatList, I18nManager, Pressable, StyleSheet, View} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import {Text, useTheme} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../constants/style';
import {CATEGORIES_ARRAY} from '../../constants/mockData';
import {categoriesInterface} from '../../interfaces/categories';
import {CustomText} from '../customText';
interface Props {
  data: categoriesInterface[];
  onSelectCategory: (categoryId: string) => void;
}

const CategoriesListIconAndName = ({data, onSelectCategory}: Props) => {
  const [selected, setselected] = React.useState<number>(0);
  const theme = useTheme();
  return (
    <View style={[styles.container]}>
      <FlatList
        style={{}}
        data={data}
        keyExtractor={(item, index) => `${item.category_id}`}
        contentContainerStyle={{
          justifyContent: 'space-evenly',
          paddingTop: 5,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({item: {name, image, category_id}, index}) => {
          return (
            <Pressable
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth:
                  selected != index && !(selected == index + 1) ? 0.2 : 0,
                borderStartWidth: selected == index ? 5 : 0,
                padding: 15,
                borderTopEndRadius: index == selected + 1 ? 20 : 0,
                borderBottomEndRadius: index == selected - 1 ? 20 : 0,
                borderColor: selected == index ? COLORS.MAINCOLOR : COLORS.GRAY,
                backgroundColor:
                  index == selected ? COLORS.WHITE : COLORS.GRAY_LIGHT,
              }}
              onPress={() => {
                setselected(index);
                onSelectCategory(category_id);
              }}>
              <CustomText text={name} textStyle={styles.text} />
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export {CategoriesListIconAndName};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 3.5,
    height: '100%',
    backgroundColor: COLORS.WHITE,
  },
  text: {
    textAlign: 'center',
  },
});
