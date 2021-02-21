import React, {useContext, useMemo, useState} from 'react';
import {FlatList, I18nManager, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, IconButton, List, Text} from 'react-native-paper';
import {
  CartFooter,
  CustomerEvaluation,
  CustomSwiper,
  CustomText,
  Loader,
  ProductCard,
  Rating,
} from '../../components';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import Share from 'react-native-share';
import Section from '../Home/Section';
import {useTranslation} from 'react-i18next';
import Reactotron from 'reactotron-react-native';
import {useQuery} from 'react-query';
import useAxios from '../../hooks/useAxios';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {ProductHeader} from './components';
import RelatedProductsSection from './components/RelatedProductsSection';
import styles from './styles';
import {cartContext} from '../../contexts/CartContext';
import {STORE_URL} from '../../constants/config.constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Product as ProductTypes} from '../../interfaces';
import reactotron from 'reactotron-react-native';
import HTMLView from 'react-native-htmlview';
import FastImage from 'react-native-fast-image';
interface Props {}

const Product = ({route, navigation}: Props) => {
  const {t} = useTranslation();
  const Axios = useAxios();
  const {id} = route?.params;
  const [selectedProductOptions, setselectedProductOptions] = useState<object>(
    {},
  );
  const {addToCart, removeCartItem, cartProducts} = useContext(cartContext);
  const addedToCart = useMemo(
    () =>
      [
        ...new Set(cartProducts?.products?.map((item) => item.product_id)),
      ].includes(id),
    [id, cartProducts?.products.length],
  );
  const getProductRequest = async () => {
    const {
      data: {Product},
    } = await Axios.post(endpoints.product, {
      product_id: id,
    });
    return Product;
  };
  const {isLoading, data, isError} = useQuery(
    `productQuery${id}`,
    getProductRequest,
    {onError: () => navigation.goBack()},
  );
  const getReviewRequest = async () => {
    const {
      data: {
        data: {reviews},
      },
    } = await Axios.post(endpoints.GetProductReview, {
      product: id,
      start: 0,
      limit: 1,
    });

    return reviews[0];
  };
  /* review request */
  const {
    isLoading: isReviewLoading,
    data: review,
    isError: isReviewError,
  } = useQuery(`productReviewQuery${id}`, getReviewRequest, {
    enabled: !!id,
  });

  /* share */
  const onSharePressed = () => {
    const shareOptions = {
      title: 'Check Out this product',
      failOnCancel: false,
      url: `${STORE_URL}/index.php?route=product/product&product_id=${id}`,
      message: `${STORE_URL}/index.php?route=product/product&product_id=${id}`,
    };
    Share.open(shareOptions)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };
  const onProductPressed = (id: string | undefined) => {
    navigation.navigate('Product', {id});
  };
  const onSelectOption = (name: string, optionId: string) => {
    setselectedProductOptions((prev) => ({...prev, [name]: optionId}));
  };
  const goToReviews = (id: string) => {
    navigation.navigate('ProductStack', {
      screen: 'Reviews',
      params: {id},
    });
  };

  const renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name == 'img') {
      const a = node.attribs;
      return (
        <FastImage
          style={{
            width: SCREEN_WIDTH,
            height: 200,
            marginBottom: 200,
            alignSelf: 'center',
          }}
          source={{
            uri: a.src.substring(0, 8) == 'https://' ? a.src : `https:${a.src}`,
          }}
          resizeMode="cover"
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loader />}
      {data && !Array.isArray(data) && (
        <>
          <ScrollView
            stickyHeaderIndices={[]}
            contentContainerStyle={{backgroundColor: COLORS.WHITE}}>
            <View style={styles.swiperContainer}>
              <CustomSwiper
                onImagePressed={() => {}}
                height={'100%'}
                images={data.product_images.map((item) => ({
                  slideimage: item.url,
                }))}
              />
              <ProductHeader onSharePressed={onSharePressed} id={id} />
            </View>

            <View style={styles.productDetailesContainer}>
              <CustomText text={data.name} textStyle={styles.productName} />
              <View style={styles.rowContainer}>
                {data.brand && (
                  <CustomText text={data.brand} style={styles.brand} />
                )}
                <Rating maxStars={5} rating={data.rating} />
              </View>

              {!!data?.product_options.length && (
                <View style={styles.rowContainer}>
                  {data?.product_options.map((option) => {
                    return (
                      <List.Accordion
                        title={
                          /* t('categoriesDetailesScreen:size') */ option.name
                        }
                        style={styles.accordion}>
                        {option.option_value.map((item) => {
                          return (
                            <List.Item
                              title={item.name}
                              right={(props) =>
                                !!Object.keys(selectedProductOptions).length &&
                                selectedProductOptions[option.option_id] ==
                                  item.option_value_id ? (
                                  <List.Icon
                                    {...props}
                                    icon="check"
                                    color={COLORS.MAINCOLOR}
                                  />
                                ) : null
                              }
                              onPress={() =>
                                onSelectOption(
                                  option.option_id,
                                  item.option_value_id,
                                )
                              }
                            />
                          );
                        })}
                      </List.Accordion>
                    );
                  })}
                </View>
              )}

              {data.seller_id && (
                <View
                  style={[
                    styles.rowContainer,
                    {
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    },
                  ]}>
                  <CustomText
                    text={`${t('productScreen:seller')}`}
                    textStyle={{...styles.brand, marginEnd: 3}}
                  />
                  {/* <Rating rating={3} /> */}
                </View>
              )}
              <View>
                {!!data?.attributes?.length && (
                  <List.Accordion
                    title={t('productScreen:productFeatures')}
                    style={styles.columnAccordion}
                    /* titleStyle={{textTransform: 'capitalize'}} */
                  >
                    {data?.attributes?.map((item, index) => {
                      return (
                        <View style={styles.attributeContainer}>
                          <CustomText
                            text={`${index + 1}. ${item.name}`}
                            textStyle={{marginBottom: 5}}
                          />
                          <CustomText
                            text={`${
                              I18nManager.isRTL
                                ? item.product_attribute_description['2'].text
                                : item.product_attribute_description['1'].text
                            }`}
                            textStyle={{marginStart: 5}}
                          />
                        </View>
                      );
                    })}
                  </List.Accordion>
                )}

                {!!data?.fixed_description?.length && (
                  <List.Accordion
                    title={t('productScreen:productsInformation')}
                    style={styles.columnAccordion}>
                    <HTMLView
                      value={data?.fixed_description}
                      style={{width: '100%'}}
                      addLineBreaks={true}
                      TextComponent={Text}
                      renderNode={renderNode}
                    />
                  </List.Accordion>
                )}

                <List.Accordion
                  titleStyle={styles.productInformationAccordionStyle}
                  title={
                    <>
                      <CustomText
                        text={t('productScreen:customerEvaluation')}
                      />
                      {!!review?.rating && (
                        <Rating rating={+review.rating} maxStars={5} />
                      )}
                    </>
                  }
                  style={styles.columnAccordion}>
                  {!!review?.rating && (
                    <CustomerEvaluation
                      userName={review.author}
                      comment={review.text}
                      rating={+review.rating}
                    />
                  )}
                  <Button onPress={() => goToReviews(data.product_id)}>
                    {t('productScreen:seeAllReviews')}
                  </Button>
                </List.Accordion>
              </View>
            </View>
            {!!data?.related_product?.length && (
              <RelatedProductsSection
                data={data?.related_product}
                onProductPressed={onProductPressed}
              />
            )}
          </ScrollView>
          <CartFooter
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            buttonTitleStyle={styles.buttonTitleStyle}
            payLabel={
              addedToCart
                ? t('categoriesDetailesScreen:removeFromCart')
                : t('categoriesDetailesScreen:addToCart')
            }
            Totalprice={`${data.float_price} ${data.currency}`}
            onBayPressed={() => {
              addedToCart
                ? removeCartItem(data.product_id, data.name)
                : addToCart(data.product_id, data.name, selectedProductOptions);
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export {Product};
