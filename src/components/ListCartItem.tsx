/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function ListCartItem({
  name,
  amount,
  price,
  unit,
  total,
  onEdit,
  onDelete,
}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.detailsButton}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.valueContainer}>
          <Text>Qtde.: {amount}</Text>
          <Text> {unit}</Text>
          <Text style={styles.price}>R$ {price?.toFixed(2)}</Text>
          <Text style={styles.price}>R$ {total?.toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onEdit} style={styles.editButton}>
        <Icon name="edit" size={20} color="royalblue" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Icon name="trash-can" size={20} color="royalblue" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 6,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    marginHorizontal: 3,
  },
  editButton: {
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 15,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  icon: {
    width: 16,
    height: 16,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontWeight: '300',
  },
  detailsButton: {
    flexGrow: 1,
  },
  valueContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  price: {
    marginStart: 10,
  },
  addIcon: {
    width: 32,
    height: 32,
  },
});
