import * as React from 'react';
import {FlatList, FlatListProps, Platform} from 'react-native';

interface HomeListProps extends FlatListProps<any> {}

const HorizontalList: React.FC<HomeListProps> = (props): JSX.Element => (
  <FlatList
    // style={{width: SCREEN_WIDTH}}
    horizontal
    showsHorizontalScrollIndicator={false}
    initialNumToRender={5}
    maxToRenderPerBatch={5}
    removeClippedSubviews={true}
    // inverted
    {...props}
  />
);

export default HorizontalList;
