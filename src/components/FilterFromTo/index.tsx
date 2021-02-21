import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {CustomText} from '../customText';

interface Props {
  onChangeText: (text: string, inputName: string) => void;
  value: object;
}

const FilterFromTo = ({onChangeText, value}: Props) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View
        style={[COMMON_STYLES.filterAccordionHeader, styles.accordionHeader]}>
        <CustomText text={t('categoriesDetailesScreen:price')} />
        <View />
      </View>
      <View style={styles.inputsWrapper}>
        <View style={styles.inputsContainer}>
          <CustomText text={t('categoriesDetailesScreen:from')} />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => onChangeText(text, 'startPrice')}
            value={value['startPrice']}
          />
        </View>

        <View style={styles.inputsContainer}>
          <CustomText text={t('categoriesDetailesScreen:to')} />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => onChangeText(text, 'endPrice')}
            value={value['endPrice']}
          />
        </View>
      </View>
    </View>
  );
};

export default FilterFromTo;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: COLORS.GRAY_LIGHT,
    marginBottom: 5,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
  },
  inputsWrapper: {
    flex: 1,
    backgroundColor: COLORS.GRAY_LIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    overflow: 'hidden',
  },
  inputsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 7,
  },
  input: {
    flex: 1,
    height: '75%',
    backgroundColor: COLORS.WHITE,
    fontFamily: 'Cairo-Regular',
    paddingVertical: 0,
    marginStart: 5,
    color: COLORS.GRAY,
  },
});
