import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, FlatList} from 'react-native';
import {ProductCard} from '../../../components';
import {Product} from '../../../interfaces';
import Section from '../../Home/Section';

interface Props {
  data: Product[];
  onProductPressed: (item: any) => void;
}

const RelatedProductsSection = ({data,onProductPressed}: Props) => {
  const {t} = useTranslation();
  return (
    <Section
      title={t('productScreen:similarProducts')}
      contentContainer={{marginHorizontal: 5}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data }
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => {
          return (
            <ProductCard
              onProductPressed={() => onProductPressed(item.product_id)}
              // containerStyle={{width: '50%'}}
              productName={item?.name}
              images={[{slideimage: item?.image}]}
              rating={item?.rating}
              price={`${item.price} ${item.currency}`}
            />
          );
        }}
      />
    </Section>
  );
};

export default RelatedProductsSection;
