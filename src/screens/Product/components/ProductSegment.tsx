import React, {useState} from 'react';
import {I18nManager, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants/style/sizes';
import {useTranslation} from 'react-i18next';
import {Button} from 'react-native-paper';
import HTMLView from 'react-native-htmlview';
import FastImage from 'react-native-fast-image';
import {CustomerEvaluation, CustomText} from '../../../components';
interface Props {
  fixedDescription: string;
  attributes: [];
  review: object;
  goToReviews: (id: string) => void;
  productId: string;
}

const renderNode = (node, index, siblings, parent, defaultRenderer) => {
  if (node.name == 'img') {
    const a = node.attribs;
    //console.log(a.src.substring(0, 8) == 'https://');

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
        resizeMode="contain"
      />
    );
  }
};

const renderFeatures = (attributes: []) => {
  return attributes?.map((item, index) => {
    return (
      <View style={styles.attributeContainer}>
        <CustomText
          text={`. ${item.name} : ${
            I18nManager.isRTL
              ? item.product_attribute_description['2'].text
              : item.product_attribute_description['1'].text
          }`}
          textStyle={{marginBottom: 5}}
        />
      </View>
    );
  });
};

const ProductSegment = ({
  fixedDescription,
  attributes,
  review,
  goToReviews,
  productId,
}: Props) => {
  const [selectedIndex, setselectedIndex] = useState(0);
  const {t} = useTranslation();
  const SEGMENTS = [
    t('productScreen:productsInformation'),
    t('productScreen:productFeatures'),
    t('productScreen:customerEvaluation'),
  ];
  const renderSegments = () => {
    return SEGMENTS.map((segment, index) => (
      <Button
        key={`${segment} ${index}`}
        onPress={() => setselectedIndex(index)}
        style={[
          styles.button,
          {
            backgroundColor:
              index == selectedIndex ? COLORS.GRAY_LIGHT : COLORS.WHITE,
          },
        ]}
        labelStyle={{
          color: index == selectedIndex ? COLORS.MAINCOLOR : COLORS.BLACK,
          fontSize: 10,
        }}>
        {segment}
      </Button>
    ));
  };

  const renderRating = (review: any) => {
    return (
      <>
        {!!review?.rating && (
          <CustomerEvaluation
            userName={review.author}
            comment={review.text}
            rating={+review.rating}
          />
        )}
        <Button onPress={() => goToReviews(productId)}>
          {t('productScreen:seeAllReviews')}
        </Button>
      </>
    );
  };
  return (
    <View style={{flex: 1, margin: 5}}>
      {
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          {renderSegments()}
        </View>
      }
      {!!fixedDescription?.length && selectedIndex == 0 && (
        <HTMLView
          value={fixedDescription}
          style={{width: '100%'}}
          addLineBreaks={true}
          TextComponent={Text}
          renderNode={renderNode}
        />
      )}
      {selectedIndex == 1 && renderFeatures(attributes)}
      {selectedIndex == 2 && renderRating(review)}
    </View>
  );
};

export {ProductSegment};

const styles = StyleSheet.create({
  button: {
    width: SCREEN_WIDTH / 3.5,
    height: SCREEN_HEIGHT / 12,
    backgroundColor: COLORS.WHITE,
    marginEnd: 5,
    borderWidth: 0.3,
    borderColor: COLORS.GRAY,
    borderRadius: 0,
    justifyContent: 'center',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5 / 2,
    backgroundColor: COLORS.MAINCOLOR,
    alignSelf: 'center',
  },
  attributeContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginVertical: 5,
    padding: 5,
  },
});
