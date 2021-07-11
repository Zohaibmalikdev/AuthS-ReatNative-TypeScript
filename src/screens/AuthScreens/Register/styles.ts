import {StyleSheet} from 'react-native';
import {colors} from '../../../layout/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBg,
  },
  contentStyle: {
    flex: 1,
    marginBottom: 20,
  },
  headStyle: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  headText: {
    fontSize: 18,
    fontWeight: '700',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 10,
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
  AvatarContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10
  },
  wall: {
    borderRightWidth: 2,
    borderRightColor: colors.primary,
    marginLeft: 10,
    marginRight: 20,
  }
});

export default styles;
