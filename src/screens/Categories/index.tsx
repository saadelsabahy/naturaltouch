import React, {useState, useEffect} from 'react';
import {FlatList, I18nManager, Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-paper';
import {Text} from 'react-native-paper';
import {
  CategoriesListIconAndName,
  CustomHeader,
  Loader,
  OneThreeImageContainer,
} from '../../components';
import {CATEGORIES_ARRAY} from '../../constants/mockData';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import {CategoriesRouter} from '../../interfaces/navigation';
import {BackArrow} from '../../svgs';
import {createCategoriesGridArray} from '../../utils';
import {useTranslation} from 'react-i18next';
import useCategory from '../../hooks/useCategory';
import Reactotron from 'reactotron-react-native';
import {categoriesInterface} from '../../interfaces/categories';
import {useQuery} from 'react-query';
import useAxios from '../../hooks/useAxios';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {ScrollView} from 'react-native-gesture-handler';
interface Props {
  navigation: CategoriesRouter;
}

const Categories = (props: Props) => {
  const {navigation} = props;
  const {t, i18n} = useTranslation();
  const Axios = useAxios();
  const {data: categories} = useCategory();
  const [selectedCategory, setselectedCategory] = useState('');

  useEffect(() => {
    setselectedCategory(categories[0].category_id);
  }, [categories[0].category_id]);

  /* get subcategories */
  const getSubCategories = async () => {
    const {
      data: {CategoryInfo},
    } = await Axios.post(endpoints.categoryInfo, {
      category_id: selectedCategory,
    });

    return CategoryInfo;
  };
  const {data, isLoading, error, refetch} = useQuery(
    `subCategories${selectedCategory}`,
    getSubCategories,
    {
      enabled: Boolean(selectedCategory),
    },
  );
  useEffect(() => {
    refetch();
    return () => {};
  }, [selectedCategory]);
  /* functions */
  const onCategoryItemPressed = (item: any) => {
    const {category_id: id, name} = item;

    navigation.navigate('CategoryDetailes', {
      id,
      name,
    });
  };

  const onSelectCategory = (categoryId: string) => {
    setselectedCategory(categoryId);
  };
  Reactotron.log({dt: data});
  return (
    <View style={{flex: 1, backgroundColor: COLORS.WHITE}}>
      <CustomHeader search={true} title={t('tabs:categories')} useMainColor />
      <View style={styles.listContainer}>
        <CategoriesListIconAndName
          data={categories}
          onSelectCategory={onSelectCategory}
        />

        <View style={{flex: 1, padding: 10, alignSelf: 'center'}}>
          {isLoading && <Loader />}
          {data && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Pressable
                onPress={() => onCategoryItemPressed(data)}
                style={styles.categoryImageContainer}>
                <FastImage
                  source={{
                    uri: data.Image,
                  }}
                  style={styles.categoryImage}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </Pressable>
              <View
                style={{
                  backgroundColor: COLORS.WHITE,
                  elevation: 5,
                  borderRadius: 5,
                }}>
                <View style={styles.subCategoriesHeaderTextContainer}>
                  <Text style={styles.subCategoriesHeaderText}>
                    {t('tabs:categories')}
                  </Text>
                </View>
                <View style={styles.subCategoriesContainer}>
                  {data.SubCategories.map((item) => {
                    return (
                      <Pressable
                        key={item.category_id}
                        style={styles.subCategoryImageContainer}
                        onPress={() => onCategoryItemPressed(item)}>
                        <FastImage
                          source={{
                            uri: item.icon_image,
                          }}
                          style={styles.subCategoryImage}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                        <Text>{item.name}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

export {Categories};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  oneImageContainer: {
    flex: 1,
    height: SCREEN_HEIGHT / 7,
    backgroundColor: 'transparent',
    borderRadius: 15,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  oneImageStyle: {width: '100%', height: '100%'},
  multiImageStyle: {
    width: '100%',
    height: '80%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
  },
  multiImageListContainer: {width: '100%', flex: 1, marginVertical: 5},
  multiImageContainer: {
    flex: 1,
    height: SCREEN_HEIGHT / 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  categoryImageContainer: {
    width: '100%',
    height: SCREEN_HEIGHT / 4,
    backgroundColor: COLORS.GRAY_LIGHT,
    alignSelf: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 5,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  subCategoriesHeaderTextContainer: {
    height: SCREEN_HEIGHT / 10,
    justifyContent: 'center',
    paddingStart: 10,
  },
  subCategoriesHeaderText: {
    fontWeight: '700',
    fontSize: 19,
  },
  subCategoriesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  subCategoryImage: {
    width: '100%',
    height: '80%',
    borderRadius: 5,
    backgroundColor: COLORS.MAINCOLOR,
  },
  subCategoryImageContainer: {
    width: '45%',
    height: SCREEN_HEIGHT / 6,
    alignItems: 'center',
    margin: 5,
  },
});
