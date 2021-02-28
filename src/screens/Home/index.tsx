import React, {useRef, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {
  HomeSearch,
  CustomHeader,
  CategoryNameAndAvatar,
  CustomSwiper,
  Loader,
  ProductCard,
} from '../../components';
import {HomeScreenProps} from '../../interfaces/navigation';
import Section from './Section';
import {ScrollView} from 'react-native-gesture-handler';
import useAxios from '../../hooks/useAxios';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {useQuery} from 'react-query';
import {COLORS} from '../../constants/style';
import {useScrollToTop} from '@react-navigation/native';
import HomeGrid from './HomeGrid';
import useCategory from '../../hooks/useCategory';
import Reactotron from 'reactotron-react-native';
import {AuthenticationContext} from '../../contexts';
import {SCREEN_HEIGHT, SWIPER_HEIGHT} from '../../constants/style/sizes';
import {SafeAreaView} from 'react-native-safe-area-context';
import HorizontalList from './HorizontalList';
interface Props {
  navigation: HomeScreenProps;
}

const Home: React.FC<Props> = ({navigation}) => {
  const scrollRef = useRef(null);
  const [refresh, setrefresh] = useState(false);
  useScrollToTop(scrollRef);
  const Axios = useAxios();
  const {
    state: {storeToken, settings, cookie},
  } = React.useContext(AuthenticationContext);
  const getHome = async () => {
    const {data} = await Axios.post(endpoints.home);
    return data;
  };
  const {isLoading, refetch, data, isFetching} = useQuery(
    'homeRequest',
    getHome,
  );
  const {data: categories, isLoading: getCategoryLoading} = useCategory();

  const onHomeItemPressed = async (item: any) => {
    Reactotron.log(item);
    if (item.product_id) {
      navigation.navigate('ProductStack', {
        screen: 'Product',
        params: {id: item.product_id},
      });
    } else if (item.category_id) {
      navigation.navigate('CategoryDetailes', {
        id: item.category_id,
        name: item.name,
      });
    } else {
      if (item.imagelinkType && item.imagelinkId) {
        try {
          const {
            data: {
              CategoryInfo: {Name},
            },
          } = await Axios.post(endpoints.categoryInfo, {
            category_id: item.imagelinkId,
          });

          item.imagelinkType == 'category'
            ? navigation.navigate('CategoryDetailes', {
                id: item.imagelinkId,
                name: Name,
              })
            : navigation.navigate('ProductStack', {
                screen: 'Product',
                params: {id: item.imagelinkId},
              });
        } catch (error) {
          console.log('get CategoryInfo error', error);
        }
      }
    }
  };

  const renderHomeContent = () => {
    return (
      <>
        {data?.Sections?.map((section, index) => {
          switch (section.SectionCodeName) {
            case 'slider':
              return (
                <Section key={section.SectionCodeName + index}>
                  <Section container={{marginVertical: 10}}>
                    <CustomSwiper
                      images={
                        section.Collections?.length && section.Collections
                      }
                      showButtons={false}
                      onImagePressed={onHomeItemPressed}
                    />
                  </Section>
                  <Section key={section.SectionCodeName + 'footerCategories'}>
                    <HorizontalList
                      data={categories}
                      keyExtractor={(item, index) => `${item.category_id}`}
                      renderItem={({item: {name, image}, item}) => {
                        return (
                          <CategoryNameAndAvatar
                            name={name}
                            avatar={image}
                            item={item}
                            onItemPressed={onHomeItemPressed}
                          />
                        );
                      }}
                    />
                  </Section>
                </Section>
              );
              break;
            case 'featuredcategories':
              return (
                <Section
                  key={section.SectionCodeName + index}
                  title={section.title}>
                  <HomeGrid
                    data={section.categories}
                    onImagePressed={onHomeItemPressed}
                  />
                </Section>
              );
              break;
            case 'featuredproducts':
              return section?.products?.length ? (
                <Section
                  key={section.SectionCodeName + index}
                  title={section.title}>
                  <HorizontalList
                    data={section?.products}
                    keyExtractor={(item, index) => `${item.product_id}`}
                    renderItem={({item}) => {
                      return (
                        <ProductCard
                          productName={item.name}
                          images={[{slideimage: item.thumb}]}
                          rating={item?.rating}
                          price={`${item.price} ${item.currency}`}
                          id={item.product_id}
                          onProductPressed={() => onHomeItemPressed(item)}
                          quantity={item.quantity}
                        />
                      );
                    }}
                  />
                </Section>
              ) : null;
              break;
            case 'twoimagebanner':
              return (
                <Section
                  title={section?.title}
                  key={section.SectionCodeName + index}>
                  <View style={styles.swipperWithBtnsContainer}>
                    <CustomSwiper
                      showButtons={true}
                      images={[
                        {slideimage: section?.firstbannerimage},
                        {slideimage: section?.secondbannerimage},
                      ]}
                      onImagePressed={() => {}}
                    />
                  </View>
                </Section>
              );
              break;
          }
        })}
      </>
    );
  };

  const onAccountPressed = () => {
    navigation.navigate('AccountStack');
  };
  const onMenuPressed = () => {};
  const onPullToRefresh = async () => {
    setrefresh(true);
    await refetch(); // requery from page 1 again
    setrefresh(false);
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <CustomHeader
        home
        onAccountPressed={onAccountPressed}
        onMenuPressed={onMenuPressed}
      />

      <ScrollView
        // nestedScrollEnabled={true}
        ref={scrollRef}
        contentContainerStyle={styles.ScrollViewContentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onPullToRefresh}
            colors={[COLORS.MAINCOLOR]}
          />
        }>
        {(isLoading || getCategoryLoading) && <Loader />}
        {data?.Sections && categories && <>{renderHomeContent()}</>}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  swipperWithBtnsContainer: {
    height: SWIPER_HEIGHT,
    zIndex: 1000000,
    margin: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  ScrollViewContentContainer: {flexGrow: 1, width: '98%', alignSelf: 'center'},
});

export {Home};
