import React, {useState, useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import {useInfiniteQuery} from 'react-query';
import reactotron from 'reactotron-react-native';
import {
  AddReviewModal,
  CustomerEvaluation,
  CustomHeader,
  CustomInput,
  EmptyList,
  FlatlistWithCustomScrollIndicator,
  Loader,
  Rating,
} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {COLORS, COMMON_STYLES} from '../../constants/style';

import useAxios from '../../hooks/useAxios';
interface Props {}

const Reviews = ({route}: Props) => {
  const {id} = route?.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setrating] = useState(0);
  const [currentPage, setcurrentPage] = useState(0);
  const {t} = useTranslation();
  const Axios = useAxios();

  const getProductReviews = useCallback(async ({pageParam}) => {
    reactotron.log({pageParam});
    const {
      data: {
        data: {reviews},
      },
    } = await Axios.post(endpoints.GetProductReview, {
      product: id,
      start: pageParam,
      limit: 10,
    });
    setcurrentPage(pageParam + 10);
    return reviews;
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
  } = useInfiniteQuery(
    `productReviews${id}`,
    ({pageParam = 0}) => getProductReviews({pageParam}),
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
      enabled: !!id,
      select: (data) => ({
        ...data,
        pages: data?.pages?.flatMap((page) => page),
      }),
    },
  );
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
  const onStarRatingPress = (rating: number) => {
    setrating(rating);
  };
  const renderReviewItem = ({item}) => {
    return (
      <CustomerEvaluation
        userName={item.author}
        comment={item.text}
        rating={+item.rating}
      />
    );
  };
  const closeModal = () => {
    setModalVisible(!modalVisible);
    setrating(0);
    refetch();
  };
  return (
    <View style={styles.container}>
      <CustomHeader title={t('productScreen:reviews')} />
      <View style={styles.listContainer}>
        {isLoading && <Loader />}
        {data && (
          <FlatlistWithCustomScrollIndicator
            style={{backgroundColor: COLORS.WHITE}}
            data={data.pages}
            renderItem={renderReviewItem}
            keyExtractor={(item) => `${item.review_id}`}
            ListFooterComponent={renderLoader}
            ListFooterComponentStyle={styles.footerComponentStyle}
            onEndReached={onEndReached}
            ListEmptyComponent={<EmptyList emptyText={t('messages:noData')} />}
            onPullToRefresh={() => refetch()}
            refresh={isFetching}
          />
        )}
      </View>
      <AddReviewModal
        rating={rating}
        onStarRatingPress={onStarRatingPress}
        modalVisible={modalVisible}
        closeModal={closeModal}
        id={id}
      />
      <View style={styles.addButtonContainer}>
        <IconButton
          style={{backgroundColor: COLORS.MAINCOLOR}}
          color={COLORS.WHITE}
          icon={'plus'}
          size={35}
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>
    </View>
  );
};

export {Reviews};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  addButtonContainer: {
    position: 'absolute',
    start: 5,
    bottom: 10,
  },
  listContainer: {flex: 1, backgroundColor: COLORS.WHITE},
  footerComponentStyle: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
