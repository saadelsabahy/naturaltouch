import React, {useCallback, useContext} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useInfiniteQuery, useQuery} from 'react-query';
import Reactotron from 'reactotron-react-native';
import {
  CategoryNameAndAvatar,
  CategorySubHeader,
  CustomHeader,
  CustomModal,
  CustomText,
  FilterList,
  FlatlistWithCustomScrollIndicator,
  Loader,
  ProductCard,
  SortItemsList,
} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {cartContext} from '../../contexts/CartContext';
import useAxios from '../../hooks/useAxios';
import {Product} from '../../interfaces';
import {FilterSelectedItemes} from '../../interfaces/categories';
import {removeDublicates} from '../../utils';
import {AuthenticationContext, FilterContext} from '../../contexts';
import reactotron from 'reactotron-react-native';

interface Props {}

const CategoryDetailes = ({navigation, route}: Props) => {
  const {id, name} = route.params;

  const [visible, setvisible] = React.useState('');
  const [toggleGrid, settoggleGrid] = React.useState(false);
  const [currentPage, setcurrentPage] = React.useState(0);
  const {selectedItems, resetSelectedItems} = useContext(FilterContext);
  const [sortItem, setsortItem] = React.useState({});
  const [inputsValues, setinputsValues] = React.useState({});
  const [refresh, setrefresh] = React.useState(false);
  const Axios = useAxios();

  React.useEffect(() => {
    return () => {
      setcurrentPage(0);
      setinputsValues({});
      setsortItem({});
      resetSelectedItems();
    };
  }, []);
  console.log(selectedItems);

  const getCategoryProducts = async ({pageParam}: {pageParam: number}) => {
    const {
      data: {items, subcategories},
    } = await Axios.post(endpoints.advancedFilter, {
      // filterText: searchText,
      start: pageParam,
      limit: 10,
      categories_ids: [id],
      filter_option: Object.values(selectedItems).filter((x) => x),
      sort_order: !!Object.values(sortItem).length ? sortItem.sort_order : '',
      sort_criteria: !!Object.values(sortItem).length
        ? sortItem.sort_criteria
        : '',

      starting_price: inputsValues?.startPrice || '',
      ending_price: inputsValues?.endPrice || '',
    });
    setcurrentPage(pageParam + 10);
    return items;
  };

  const getFilterOptions = useCallback(async () => {
    const {
      data: {
        data: {options},
      },
    } = await Axios.post(endpoints.filterOptions, {category_id: id});

    return options;
  }, [id]);
  const {data: filterOptions, isLoading: loadingFilterOptions} = useQuery(
    `getfilterOptions${id}`,
    getFilterOptions,
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
    isFetching,
  } = useInfiniteQuery(
    `categoryDetails${id}`,
    ({pageParam = 0}) => getCategoryProducts({pageParam}),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.length) {
          return currentPage;
        }
        return undefined;
      },
      // getPreviousPageParam: (firstPage) => firstPage.prevCursor,
      staleTime: 100,
      cacheTime: 100,
      enabled: !!id,
      select: (data) => ({...data, pages: data.pages.flatMap((page) => page)}),
    },
  );

  const onShowModalPressed = (type: string) => setvisible(type);
  const hideModal = () => setvisible('');

  const onProductPressed = (productId: string | undefined) => {
    !!productId &&
      navigation.navigate('ProductStack', {
        screen: 'Product',
        params: {id: productId},
      });
  };
  const listHeaderComponent = () => (
    <View style={{backgroundColor: COLORS.WHITE}}>
      <FlatList
        data={[]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => {
          return <CategoryNameAndAvatar />;
        }}
      />
    </View>
  );

  const renderProductCardItem = ({item}: {item: Product}) => {
    return (
      <ProductCard
        onProductPressed={() => onProductPressed(item.product_id)}
        containerStyle={{width: toggleGrid ? '100%' : '50%'}}
        productName={item.name}
        images={[{slideimage: item.image}]}
        rating={item?.rating}
        price={`${item.price} ${item.currency}`}
        id={item.product_id}
      />
    );
  };

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const renderLoader = useCallback(() => {
    return hasNextPage ? (
      <ActivityIndicator
        animating={isFetchingNextPage}
        color={COLORS.MAINCOLOR}
      />
    ) : null;
  }, [isFetchingNextPage]);

  const onApplyFilterOrSortPressed = () => {
    onPullToRefresh();
    hideModal();
  };

  const onSortItemChange = ({
    sort_criteria,
    sort_order,
    name,
  }: {
    name: string;
    sort_criteria: string;
    sort_order: string;
  }) => {
    if (sortItem.sort_criteria == sort_criteria) {
      setsortItem({});
    } else {
      setsortItem({sort_criteria, sort_order, name});
    }
  };

  const onStartEndPriceINputsChange = (value: string, inputName: string) => {
    setinputsValues({...inputsValues, [inputName]: value});
  };

  const onPullToRefresh = async () => {
    setrefresh(true);
    await refetch();
    setrefresh(false);
  };
  return (
    <View style={{flex: 1}}>
      <CustomHeader title={name && name} style={{elevation: 0}} search />
      {isLoading && <Loader />}
      {!!data && (
        <>
          {!!data?.pages.length && (
            <CategorySubHeader
              onSortPressed={() => onShowModalPressed('sort')}
              onFilterPressed={() => onShowModalPressed('filter')}
              grid
              onGridPressed={() => settoggleGrid(!toggleGrid)}
              gridIcon={toggleGrid ? 'grid-off' : 'view-grid-outline'}
            />
          )}
          <View style={styles.listContainer}>
            <FlatlistWithCustomScrollIndicator
              //stickyHeaderIndices={[0]}
              ListHeaderComponent={listHeaderComponent}
              numColumns={toggleGrid ? 1 : 2}
              key={toggleGrid ? 1 : 2}
              data={removeDublicates(data?.pages)}
              keyExtractor={(item, index: number) => `${item.product_id}`}
              renderItem={renderProductCardItem}
              onEndReached={onEndReached}
              ListFooterComponent={renderLoader}
              ListFooterComponentStyle={COMMON_STYLES.paginationLoaderStyle}
              onPullToRefresh={onPullToRefresh}
              refresh={refresh}
            />
          </View>

          {/* modals */}
          {!!data?.pages?.length && (
            <CustomModal
              visible={!!visible}
              hideModal={hideModal}
              type={visible}
              onApplyPressed={onApplyFilterOrSortPressed}>
              {visible == 'sort' && (
                <SortItemsList
                  onItemPressed={onSortItemChange}
                  selected={sortItem}
                />
              )}
              {visible == 'filter' && (
                <FilterList
                  filterOptions={filterOptions}
                  onChangeText={onStartEndPriceINputsChange}
                  inputsValues={inputsValues}
                />
              )}
            </CustomModal>
          )}
        </>
      )}
    </View>
  );
};

export {CategoryDetailes};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '98%',
    alignSelf: 'center',
  },
});
