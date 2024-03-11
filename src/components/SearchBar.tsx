/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function SearchBar({
  label,
  placeholder,
  clearText,
  searchAction,
  textValue,
  changeValue,
  isEmpty,
}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.rowActions}>
        <TextInput
          style={styles.inputText}
          placeholder={placeholder}
          value={textValue}
          onChangeText={changeValue}
        />
        {!isEmpty && (
          <TouchableOpacity onPress={clearText} style={{marginEnd: 15}}>
            <Icon name="trash-alt" size={24} color="royalblue" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={searchAction} style={styles.searchButton}>
          <Icon name="search" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'rgb(138, 138, 138)',
    marginBottom: 5,
  },
  rowActions: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(221, 221, 221)',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  inputText: {
    paddingHorizontal: 15,
    flexGrow: 1,
  },
  deleteIcon: {
    width: 18,
    height: 18,
    marginEnd: 15,
  },
  searchButton: {
    backgroundColor: 'rgb(65, 105, 225)',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
});
