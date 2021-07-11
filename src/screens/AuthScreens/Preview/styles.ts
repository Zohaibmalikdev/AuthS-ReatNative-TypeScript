import {StyleSheet} from 'react-native';
import {colors} from '../../../layout/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBg,
  },
  contentContainer: {
    padding: 20
  },
  lineBreake: {
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    marginBottom: 10
  },
  headText: {
    fontSize: 18,
    fontWeight: '700',
  },
  bodyText: {
    fontSize: 16,
    fontWeight: '500',
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    paddingTop: 5,
    paddingRight: 10,
  },
  inputContainer: {
    justifyContent: 'center',
    padding: 20,
  },
  signupLink: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    color: colors.primary,
    fontWeight: '700',
  },
  signupView: {
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.containerBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.containerBg,
  },
  AvatarContainer: {
    flex: 2,
    flexDirection: 'row',
    minHeight: 75,
  }

});

export default styles;
