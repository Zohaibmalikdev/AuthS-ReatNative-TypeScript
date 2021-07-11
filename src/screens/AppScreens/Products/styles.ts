import { StyleSheet } from 'react-native';
import { colors } from '../../../layout/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBg,
  },
  loadingFooter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '400',
  }
});

export default styles;
