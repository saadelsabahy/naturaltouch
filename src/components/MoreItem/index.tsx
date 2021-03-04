import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {List} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT} from '../../constants/style/sizes';

interface Props {
  title?: string;
  sections: {name: string; icon: string; onPress: () => void}[];
}

const MoreItem = ({title, sections}: Props) => {
  return (
    <List.Section style={{width: '90%', alignSelf: 'center'}}>
      {title && (
        <List.Subheader style={styles.Subheader}>{title}</List.Subheader>
      )}
      {sections.map(({name, icon, onPress}, index) => {
        return (
          <List.Item
            onPress={onPress}
            key={`${name}${index}`}
            title={name}
            titleStyle={{textTransform: 'capitalize'}}
            left={(props) => (
              <List.Icon icon={icon} {...props} color={COLORS.MAINCOLOR} />
            )}
            style={styles.container}
          />
        );
      })}
    </List.Section>
  );
};

export {MoreItem};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: SCREEN_HEIGHT / 13,
    borderRadius: 5,
    backgroundColor: COLORS.GRAY_LIGHT,
    marginVertical: 3,
  },
  Subheader: {
    fontSize: 20,
    paddingHorizontal: 0,
    textTransform: 'capitalize',
    letterSpacing: 1,
  },
});
