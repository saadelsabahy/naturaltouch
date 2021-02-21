import * as React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  I18nManager,
} from 'react-native';
import {Text} from 'react-native-paper';
import {CustomText} from '../../components';
import {COLORS} from '../../constants/style';

interface SectionStyle {
  container?: ViewStyle;
  titleContainer?: ViewStyle;
  titleStyle?: TextStyle;
}
interface SectionProps extends SectionStyle {
  children?: React.ReactElement;
  title?: string;
  contentContainer?: ViewStyle;
}

const styles = StyleSheet.create<SectionStyle>({
  container: {
    marginBottom: 6,
    overflow: 'hidden',
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 5,
  },
  titleContainer: {
    paddingVertical: 6,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,

    overflow: 'hidden',
  },
  titleStyle: {
    fontFamily: 'Cairo-Bold',
    fontSize: 18,
    // textAlign: I18nManager.isRTL ? 'right' : 'left',
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
});

const Section: React.FC<SectionProps> = ({
  children,
  title,
  container,
  titleContainer,
  titleStyle,
  contentContainer,
}): JSX.Element => (
  <View style={StyleSheet.compose(styles.container, container)}>
    {title && true && title !== '' ? (
      <View style={StyleSheet.compose(styles.titleContainer, titleContainer)}>
        <CustomText
          text={title}
          textStyle={StyleSheet.compose(styles.titleStyle, titleStyle)}
        />
      </View>
    ) : null}
    <View style={[contentContainer]}>{children}</View>
  </View>
);

export default Section;
