import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  FlatListProps,
  Platform,
  ScrollViewProps,
  RefreshControl,
  FlatList,
} from 'react-native';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import {EmptyList} from '../ListEmptyComponent';
// import Animated,{interpolate,multiply} from 'react-native-reanimated';
interface Props extends FlatListProps<any>, ScrollViewProps {
  indicatorColor?: string;
  refresh?: boolean;
  onPullToRefresh: () => void;
}

const FlatlistWithCustomScrollIndicator = ({
  indicatorColor,
  onPullToRefresh,
  refresh,
  ...props
}: Props) => {
  const [contentOffset, setContentOffset] = React.useState(
    new Animated.Value(0),
  );
  const [wholeHeight, setWholeHeight] = React.useState(1);
  const [visibleHeight, setvisibleHeight] = React.useState(0);

  const indicatorSize = React.useMemo(
    () =>
      wholeHeight > visibleHeight
        ? (visibleHeight * visibleHeight) / wholeHeight
        : visibleHeight,
    [visibleHeight, wholeHeight],
  );

  const difference = React.useMemo(
    () => (visibleHeight > indicatorSize ? visibleHeight - indicatorSize : 1),
    [visibleHeight, indicatorSize],
  );
  return (
    <View style={[styles.container]}>
      <View style={[styles.flatlistContainer]}>
        <FlatList
          // showsVerticalScrollIndicator={true}
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl
              refreshing={!!refresh}
              onRefresh={onPullToRefresh}
              tintColor={COLORS.MAINCOLOR}
              titleColor={COLORS.MAINCOLOR}
              colors={[COLORS.MAINCOLOR, COLORS.MAINCOLOR]}
              enabled
            />
          }
          scrollEventThrottle={100}
          updateCellsBatchingPeriod={1000}
          initialNumToRender={10}
          maxToRenderPerBatch={80}
          bounces={false}
          onEndReachedThreshold={0.4}
          overScrollMode="never"
          removeClippedSubviews={true}
          //scrollEventThrottle={16}
          // onScroll={Animated.event(
          //   [
          //     {
          //       nativeEvent: {
          //         contentOffset: {y: contentOffset},
          //       },
          //     },
          //   ],
          //   {useNativeDriver: false},
          // )}
          // onContentSizeChange={(_, height) => {
          //   setWholeHeight(height);
          // }}
          // onLayout={(e) => {
          //   setvisibleHeight(e.nativeEvent.layout.height);
          // }}
          getItemLayout={(data, index) => ({
            length: 80,
            offset: 80 * index,
            index,
          })}
          ListEmptyComponent={<EmptyList />}
          automaticallyAdjustContentInsets={false}
          {...props}
        />
      </View>
      {/* <View style={styles.indicatorContainer}>
        <Animated.View
          style={{
            transform: [
              {
                translateY: Animated.multiply(
                  contentOffset,
                  visibleHeight / wholeHeight,
                ).interpolate({
                  inputRange: [0, difference],
                  outputRange: [0, difference],
                  extrapolate: 'clamp',
                }),
              },
            ],
            height: indicatorSize,
            borderRadius: Math.round(SCREEN_WIDTH / 2 + SCREEN_HEIGHT / 2),
            backgroundColor: indicatorColor || COLORS.MAINCOLOR,
            width: '90%',
          }}
        />
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  flatlistContainer: {
    flex: 1,
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  indicatorContainer: {
    height: '99%',
    width: SCREEN_WIDTH / 30,
    borderRadius: Math.round(SCREEN_WIDTH / 2 + SCREEN_HEIGHT / 2),
    overflow: 'hidden',
    backgroundColor: COLORS.GRAY_LIGHT,
    alignItems: 'center',
    alignSelf: 'center',
    marginStart: 10,
    marginEnd: 5,
  },
});

export {FlatlistWithCustomScrollIndicator};
