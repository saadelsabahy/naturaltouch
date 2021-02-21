import React from 'react';
import {Pressable, StyleSheet, View, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT} from '../../constants/style/sizes';
interface Props {
  onImagePressed?: (item: any) => void;
  image: string;
  name: string;
  item: any;
  home: boolean;
  product?: boolean;
}

const OneThreeImageContainer = ({
  onImagePressed,
  image,
  name,
  item,
  home,
  product,
}: Props) => {
  return (
    <View style={[styles.multiImageListContainer]}>
      {Array.isArray(item) ? (
        <FlatList
          numColumns={3}
          scrollEnabled={false}
          data={item}
          keyExtractor={(item, index) => `${index}`}
          showsVerticalScrollIndicator={false}
          renderItem={({item: {thumb, name, icon, image}, item, index}) => {
            return (
              <Pressable
                onPress={() => onImagePressed(item)}
                style={[
                  styles.multiImageContainer,
                  {
                    marginEnd: item.length - 1 == index ? 0 : 5,
                    borderRadius: home ? 0 : 15,
                  },
                ]}>
                <FastImage
                  source={{uri: product ? thumb : icon}}
                  style={[
                    styles.multiImageStyle,
                    {
                      height: home ? '100%' : '80%',
                      borderRadius: home ? 0 : 15,
                    },
                  ]}
                  resizeMode="contain"
                />
                {!home && <Text style={{textAlign: 'center'}}>{name}</Text>}
              </Pressable>
            );
          }}
        />
      ) : (
        <Pressable
          onPress={() => onImagePressed(item)}
          style={[styles.oneImageContainer, {borderRadius: home ? 0 : 15}]}>
          <FastImage
            source={{uri: image}}
            style={styles.oneImageStyle}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </Pressable>
      )}
    </View>
  );
};

export {OneThreeImageContainer};

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
    borderRadius: 15,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  oneImageStyle: {width: '100%', height: '100%'},
  multiImageStyle: {
    width: '100%',
    height: '80%',
    backgroundColor: COLORS.WHITE,
  },
  multiImageListContainer: {width: '100%', flex: 1, marginVertical: 5},
  multiImageContainer: {
    flex: 1,
    height: SCREEN_HEIGHT / 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
