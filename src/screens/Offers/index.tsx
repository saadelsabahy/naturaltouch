import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useInfiniteQuery} from 'react-query';
import reactotron from 'reactotron-react-native';
import {
  Banner,
  CustomHeader,
  EmptyList,
  FlatlistWithCustomScrollIndicator,
  Loader,
} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import {AuthenticationContext} from '../../contexts';
import useAxios from '../../hooks/useAxios';
import {Product} from '../../interfaces';

interface Props {}

const Offers = ({navigation}: Props) => {
  const {t, i18n} = useTranslation();
  const Axios = useAxios();
  const [currentPage, setcurrentPage] = useState(0);
  const {
    state: {userToken},
  } = useContext(AuthenticationContext);
  const getOffers = useCallback(async ({pageParam}) => {
    reactotron.log({pageParam});
    const {
      data: {categories},
    } = await Axios.post(endpoints.advancedFilter, {
      offer_categories: true,
      start: pageParam,
      limit: 10,
    });
    setcurrentPage(pageParam + 10);
    return categories;
  }, []);
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
    isFetching,
  } = useInfiniteQuery(`offers`, ({pageParam = 0}) => getOffers({pageParam}), {
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
    select: (data) => ({
      ...data,
      pages: data?.pages?.flatMap((page) => page),
    }),
  });

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

  const onImagePressed = (id: string, name: string) => {
    navigation.navigate('CategoryDetailes', {id, name});
  };
  const renderItem = ({
    item,
  }: {
    item: {category_id: string; image: string; name: string};
  }) => {
    return (
      <Pressable onPress={() => onImagePressed(item.category_id, item.name)}>
        <Banner image={item.image} />
      </Pressable>
    );
  };
  //remove dublicates
  const Ids = [...new Set(data?.pages?.map((item) => item.category_id))];
  const notRedundency = Ids.map((id) =>
    data?.pages?.find((order) => order.category_id == id),
  );
  const onPullToRefresh = () => {
    refetch();
  };
  console.log(isFetching);

  return (
    <SafeAreaView style={[styles.container]}>
      <CustomHeader title={t('tabs:offers')} />
      {isLoading ? (
        <Loader />
      ) : (
        <FlatlistWithCustomScrollIndicator
          data={notRedundency?.length && notRedundency}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.category_id}`}
          ListFooterComponent={renderLoader}
          ListFooterComponentStyle={styles.footerComponentStyle}
          onEndReached={onEndReached}
          ListEmptyComponent={<EmptyList emptyText={t('messages:noData')} />}
          onPullToRefresh={onPullToRefresh}
          refresh={isFetching}
        />
      )}
    </SafeAreaView>
  );
};

export {Offers};

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
    // alignSelf: 'center',
  },
  footerComponentStyle: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
