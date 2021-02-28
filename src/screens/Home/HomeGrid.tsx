import React from 'react';
import {View, Text, FlatListProps, StyleSheet, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';
import {OneThreeImageContainer} from '../../components';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT} from '../../constants/style/sizes';
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
      data={data}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({item, item: {name, thumb, icon}, index}) => {
        return (
          <Pressable
            onPress={() => onImagePressed(item)}
            style={[styles.oneImageContainer]}>
            <FastImage
              source={{uri: product ? thumb : icon}}
              style={[styles.oneImageStyle]}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </Pressable>
        );
      }}
      {...props}
    />
  );
};
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
    borderRadius: 5,
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 3,
  },
  oneImageStyle: {width: '100%', height: '100%'},
  multiImageStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.WHITE,
  },
  multiImageListContainer: {width: '100%', flex: 1, marginVertical: 5},
  multiImageContainer: {
    flex: 1,
    height: SCREEN_HEIGHT / 5,
    overflow: 'hidden',
  },
});

export default HomeGrid;
