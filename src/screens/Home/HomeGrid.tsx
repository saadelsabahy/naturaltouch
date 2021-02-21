import React from 'react';
import {View, Text, FlatListProps} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {OneThreeImageContainer} from '../../components';
import {createCategoriesGridArray} from '../../utils';

interface Props {
  data: object[];
  onImagePressed?: (item: any) => void;
  product?: boolean;
}

const HomeGrid = ({product, data, onImagePressed, ...props}: Props) => {
  return (
    <FlatList
      style={{width: '95%', alignSelf: 'center'}}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      data={
        data?.length && data.length > 4
          ? createCategoriesGridArray(data).slice(0, 2)
          : createCategoriesGridArray(data)
      }
      keyExtractor={(item, index) => `${index}`}
      renderItem={({item, item: {name, thumb, icon}, index}) => {
        return (
          <OneThreeImageContainer
            home
            name={name}
            image={product ? thumb : icon}
            item={item}
            onImagePressed={onImagePressed}
            product={product}
          />
        );
      }}
      {...props}
    />
  );
};

export default HomeGrid;
