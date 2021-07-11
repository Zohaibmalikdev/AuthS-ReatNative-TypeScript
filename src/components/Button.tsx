import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import {colors} from '../layout/colors';

interface Props extends TouchableOpacityProps {
  text: string;
  over_style: any;
}

export class Button extends Component<Props, {}> {
  render() {
    const {text, over_style} = this.props;
    return (
      <TouchableOpacity
        {...this.props}
        style={
          over_style
            ? {...styles.buttonStyle, ...over_style}
            : styles.buttonStyle
        }>
        <Text style={styles.buttonTextStyle}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.primary,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonTextStyle: {
    color: colors.containerBg,
    fontWeight: '700',
    fontSize: 16,
  },
});
