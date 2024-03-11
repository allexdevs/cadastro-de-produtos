/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function FloatingActionButton({
  click,
  iconName,
  iconSize,
  iconColor,
  bottom,
  width,
  height,
  right,
  bgColor,
}: any) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          bottom: bottom,
          width: width,
          height: height,
          right: right,
          backgroundColor: bgColor,
        },
      ]}
      onPress={click}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  icon: {
    width: 22,
    height: 22,
  },
});
