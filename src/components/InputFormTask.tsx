/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

export default function InputFormTask({
  placeholder,
  keyboardType,
  isTextArea,
  onChange,
  value,
  label,
  isDisabled,
  width,
}: any) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <TextInput
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          multiline={isTextArea}
          style={[
            isTextArea ? {minHeight: 160} : {minHeight: 'auto'},
            {width: width},
          ]}
          textAlignVertical={isTextArea ? 'top' : 'center'}
          editable={isDisabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(221, 221, 221)',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: 'rgb(192, 192, 192)',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#888',
    fontSize: 15,
    marginBottom: 5,
  },
});
