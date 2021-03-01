import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import Modal from 'react-native-modal';
import {Button, IconButton, Text} from 'react-native-paper';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props extends ViewProps {
  visible: boolean;
  hideModal: () => void;
  type: 'filter' | 'sort' | '';
  children: ReactNode;
  onApplyPressed: () => void;
}

const CustomModal = ({
  visible,
  hideModal,
  type,
  onApplyPressed,
  children,
}: Props) => {
  const {t} = useTranslation();
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={hideModal}
      backdropColor={COLORS.WHITE}
      backdropOpacity={visible ? 1 : 0}
      onBackButtonPress={hideModal}
      style={styles.modalStyle}>
      <View style={styles.closeHeader}>
        <View>
          {type == 'sort' && (
            <View style={{flexDirection: 'row', marginStart: 5}}>
              <Text>{t('categoriesDetailesScreen:sort')}</Text>
              <Icon name="swap-vertical" size={25} color={COLORS.MAINCOLOR} />
            </View>
          )}
          {type == 'filter' && (
            <View style={{flexDirection: 'row', marginStart: 5}}>
              <Text> {t('categoriesDetailesScreen:filter')}</Text>
              <Icon name="filter-outline" color={COLORS.GRAY} size={25} />
            </View>
          )}
        </View>
        <IconButton
          icon="close"
          onPress={hideModal}
          color={COLORS.MAINCOLOR}
          size={30}
        />
      </View>
      <View
        style={
          type == 'sort'
            ? styles.modalContentForSort
            : styles.modalContentForFilter
        }>
        {children}

        <Button
          style={[COMMON_STYLES.deleteBorderRadius]}
          labelStyle={COMMON_STYLES.whiteText}
          mode="contained"
          onPress={onApplyPressed}>
          {t('general:apply')}
        </Button>
      </View>
    </Modal>
  );
};

export {CustomModal};

const styles = StyleSheet.create({
  modalStyle: {
    height: SCREEN_HEIGHT,
    margin: 0,
    width: SCREEN_WIDTH,
  },
  modalContentForSort: {
    flex: 1,

    backgroundColor: COLORS.WHITE,
    elevation: 2,
    marginBottom: 0,
    paddingBottom: 0,
  },
  modalContentForFilter: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  closeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: SCREEN_HEIGHT / 10,
  },
});
