import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Avatar, useTheme} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {CustomText} from '../customText';
interface Props {
  name: string;
  avatar: string;
  item?: any;
  onItemPressed?: (item: any) => void;
}

const CategoryNameAndAvatar = ({name, avatar, item, onItemPressed}: Props) => {
  const theme = useTheme();
  return (
    <Pressable style={[styles.container]} onPress={() => onItemPressed(item)}>
      {avatar && (
        <Avatar.Image
          size={60}
          theme={theme}
          style={{marginVertical: 2}}
          source={{
            uri:
              avatar ||
              'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          }}
        />
      )}
      {name && <CustomText text={name} />}
    </Pressable>
  );
};

export {CategoryNameAndAvatar};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
});
