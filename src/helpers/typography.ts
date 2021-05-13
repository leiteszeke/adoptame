import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const typography = () => {
  // @ts-ignore
  const oldTextRender = Text.render;

  // @ts-ignore
  Text.render = function (...args) {
    const origin = oldTextRender.call(this, ...args);

    return React.cloneElement(origin, {
      style: [styles.defaultText, origin.props.style],
    });
  };
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Poppins-Regular',
  },
});
