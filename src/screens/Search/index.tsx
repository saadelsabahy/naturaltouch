import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {
  configureFonts,
  IconButton,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useInfiniteQuery, QueryClient} from 'react-query';
import Reactotron from 'reactotron-react-native';
import {EmptyList, Loader, ProductCard} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {COLORS, FONTS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import useAxios from '../../hooks/useAxios';
import {Product} from '../../interfaces';

interface Props {}

const Search = ({navigation}: Props) => {
  const [searchText, setsearchText] = useState<string>('');
  const {t, i18n} = useTranslation();
  const Axios = useAxios();
  const theme = useTheme();
  const [currentPage, setcurrentPage] = useState<number>(0);
  const getSearchData = useCallback(
    async ({pageParam}) => {
      const {
        data: {items},
      } = await Axios.post(endpoints.advancedFilter, {
        filterText: searchText,
        start: pageParam,
        limit: 10,
      });
      setcurrentPage(pageParam + 10);
      return items;
    },
    [searchText],
  );
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data,
    isError,
    isLoading,
    refetch,
  } = useInfiniteQuery(
    `searchQuery${searchText}`,
    ({pageParam = 0}) => getSearchData({pageParam}),
    {
      getNextPageParam: (lastPage) => {
        /*  Reactotron.log(lastPage[lastPage.length - 1].product_id); */

        if (lastPage?.length) {
          return currentPage;
        }
        return undefined;
      },
      // getPreviousPageParam: (firstPage) => firstPage.prevCursor,
      staleTime: 100,
      cacheTime: 100,
      enabled: !!searchText,
      select: (data) => ({
        ...data,
        pages: data?.pages?.flatMap((page) => page),
      }),
    },
  );
  const onChangeText = (text: string) => {
    setsearchText(text);
  };
  // Reactotron.log(hasNextPage, isFetchingNextPage, data);

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  useEffect(() => {
    return () => {
      setcurrentPage(0);
    };
  }, []);

  const renderLoader = useCallback(() => {
    return hasNextPage ? (
      <ActivityIndicator
        animating={isFetchingNextPage}
        color={COLORS.MAINCOLOR}
      />
    ) : null;
  }, [isFetchingNextPage]);
  const onProductPressed = (productId: string | undefined) => {
    !!productId &&
      navigation.navigate('ProductStack', {
        screen: 'Product',
        params: {id: productId},
      });
  };

  const renderSearchItem = ({item}) => {
    return (
      <ProductCard
        containerStyle={{
          width: SCREEN_WIDTH / 2 - 5,
        }}
        productName={item.name}
        images={[{slideimage: item.image}]}
        rating={item?.rating}
        price={`${item.price} ${item.currency}`}
        onProductPressed={() => onProductPressed(item.product_id)}
        id={item.product_id}
      />
    );
  };
  //remove dublicates
  const Ids = [...new Set(data?.pages?.map((item) => item.product_id))];
  const notRedundency = Ids.map((id) =>
    data?.pages?.find((order) => order.product_id == id),
  );

  return (
    <SafeAreaView style={[styles.container]}>
      <Pressable style={styles.searchContainer}>
        <IconButton icon="magnify" size={20} />
        <TextInput
          mode="flat"
          autoFocus
          placeholder={t('homeScreen:searchPlaceHolder')}
          style={styles.input}
          onChangeText={onChangeText}
          value={searchText}
          theme={{
            ...theme,
            colors: {primary: COLORS.MAINCOLOR},
            fonts: configureFonts({
              ios: FONTS,
              android: FONTS,
              default: FONTS,
            }),
          }}
        />
      </Pressable>
      <View style={[styles.container]}>
        {isLoading ? (
          <Loader />
        ) : (
          <KeyboardAwareFlatList
            // style={{alignSelf: 'center', width: SCREEN_WIDTH}}
            contentContainerStyle={styles.listContainerStyle}
            data={searchText && notRedundency?.length ? notRedundency : []}
            renderItem={renderSearchItem}
            keyExtractor={(item) => `${item.product_id}`}
            numColumns={2}
            onEndReachedThreshold={0.4}
            ListFooterComponent={renderLoader}
            removeClippedSubviews={true}
            initialNumToRender={10}
            maxToRenderPerBatch={80}
            ListFooterComponentStyle={styles.footerComponentStyle}
            onEndReached={onEndReached}
            ListEmptyComponent={
              searchText ? <EmptyList emptyText={t('messages:noData')} /> : null
            }
            getItemLayout={(data, index) => ({
              length: 80,
              offset: 80 * index,
              index,
            })}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export {Search};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  searchContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 17,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    height: SCREEN_HEIGHT / 17,
  },
  listContainerStyle: {
    flexGrow: 1,
    alignSelf: 'center',
  },
  footerComponentStyle: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
