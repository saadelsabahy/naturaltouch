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
  }, [categories.length]);

  /* get subcategories */
  const getSubCategories = async () => {
    const {
      data: {
        CategoryInfo: {SubCategories},
      },
    } = await Axios.post(endpoints.categoryInfo, {
      category_id: selectedCategory,
    });

    return SubCategories;
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
  Reactotron.log({data});
  return (
    <View style={{flex: 1, backgroundColor: COLORS.WHITE}}>
      <CustomHeader search={true} title={t('tabs:categories')} useMainColor />
      <View style={styles.listContainer}>
        <CategoriesListIconAndName
          data={categories}
          onSelectCategory={onSelectCategory}
        />

        <View style={{flex: 1}}>
          {isLoading && <Loader />}
          {data && (
            <FlatList
              style={{width: '98%', alignSelf: 'center'}}
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({
                item,
                item: {subCategories, icon_image, name},
                index,
              }) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      height: 'auto',
                      marginBottom: 5,
                      justifyContent: 'space-between',
                    }}>
                    <Pressable
                      onPress={() => onCategoryItemPressed(item)}
                      style={{
                        width: '97%',
                        height: SCREEN_HEIGHT / 8,
                        backgroundColor: COLORS.WHITE,

                        alignSelf: 'center',
                        overflow: 'hidden',
                        alignItems: 'center',
                        marginBottom: 5,
                      }}>
                      <FastImage
                        source={{
                          uri: icon_image,
                        }}
                        style={{
                          width: '100%',
                          height: '70%',
                          borderRadius: 10,
                          backgroundColor: COLORS.GRAY_LIGHT,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                      <Text>{name}</Text>
                    </Pressable>
                    {subCategories?.length ? (
                      <FlatList
                        horizontal
                        inverted={I18nManager.isRTL}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => `${item.category_id}`}
                        data={subCategories}
                        renderItem={({item, index}) => {
                          return (
                            <Pressable
                              style={{
                                flex: 1,
                                alignItems: 'center',
                                marginEnd: 5,
                              }}
                              onPress={() => onCategoryItemPressed(item)}>
                              <FastImage
                                source={{
                                  uri: item.icon_image,
                                }}
                                style={{
                                  width: SCREEN_WIDTH / 3,
                                  height: SCREEN_HEIGHT / 8,
                                  backgroundColor: COLORS.GRAY_LIGHT,
                                  borderRadius: 5,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                              <Text>{item.name}</Text>
                            </Pressable>
                          );
                        }}
                      />
                    ) : null}
                  </View>
                );
              }}
            />
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
});
{
  /* <OneThreeImageContainer
                      onImagePressed={onCategoryItemPressed}
                      name={name}
                      image={image}
                      item={SubCategories || []}
                    /> */
}
