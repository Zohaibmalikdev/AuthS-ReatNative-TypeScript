import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../layout/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Fontisto';
import IconE from 'react-native-vector-icons/Entypo';

Icon.loadFont();
IconF.loadFont();
IconE.loadFont();

interface Props {
  title: string;
  leftButtonPress?: () => void;
  rightButtonPress?: () => void;
  backButtonPress?: () => void;
  logoutButtonPress?: () => void;
  viewButtonPress?: () => void;
  submitButtonPress?: () => void;
  addButtonPress?: () => void;
}

export class Header extends Component<Props, {}> {
  render() {
    const {
      title,
      leftButtonPress,
      rightButtonPress,
      backButtonPress,
      logoutButtonPress,
      viewButtonPress,
      submitButtonPress,
      addButtonPress,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {backButtonPress ? (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={backButtonPress}>
              <Icon name="arrow-back" size={24} />
            </TouchableOpacity>
          ) : null}
          {leftButtonPress ? (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={leftButtonPress}>
              <Icon name="ios-menu" size={24} />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.midContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.rightContainer}>
          {rightButtonPress ? (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={rightButtonPress}>
              <Icon name="add" size={24} />
            </TouchableOpacity>
          ) : null}
          {logoutButtonPress ? (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={logoutButtonPress}>
              <Icon name="ios-power" size={24} />
            </TouchableOpacity>
          ) : null}
          {viewButtonPress ? (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={viewButtonPress}>
              <IconF name="preview" size={24} />
            </TouchableOpacity>
          ) : null}
          {submitButtonPress ? (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={submitButtonPress}>
              <Icon name="cloud-done" size={24} />
            </TouchableOpacity>
          ) : null}
          {addButtonPress ? (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={addButtonPress}>
              <IconE name="add-to-list" size={24} />
            </TouchableOpacity>
          ) : null}
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.containerBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  midContainer: {
    flex: 3,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  iconButton: {
    paddingHorizontal: 16,
  },
});
