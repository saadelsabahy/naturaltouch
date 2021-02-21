import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import Modal from 'react-native-modal';
import {Button, IconButton} from 'react-native-paper';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import {useTranslation} from 'react-i18next';
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
      backdropOpacity={visible ? 0.5 : 0}
      onBackButtonPress={hideModal}
      style={styles.modalStyle}>
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
    //backgroundColor: 'red',
    justifyContent: 'flex-start',
    paddingBottom: 0,
    margin: 0,
    marginTop: SCREEN_HEIGHT / 6,
  },
  modalContentForSort: {
    height: 'auto',
    maxHeight: SCREEN_HEIGHT / 2,
    alignSelf: 'center',
    width: SCREEN_WIDTH - 20,
    backgroundColor: COLORS.WHITE,
    elevation: 2,
    marginBottom: 0,
    paddingBottom: 0,
  },
  modalContentForFilter: {
    flex: 1,
    alignSelf: 'center',
    width: SCREEN_WIDTH - 5,
    backgroundColor: COLORS.WHITE,
    elevation: 2,
    marginBottom: 5,
    paddingBottom: 0,
  },
});
