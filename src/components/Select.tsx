/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Select({
  options,
  label,
  value,
  isShow,
  onOpen,
  onClose,
}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.selectButton} onPress={onOpen}>
        <Text>{value ? value : 'Ex.: UN'}</Text>
      </TouchableOpacity>

      <Modal visible={isShow} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.listContainer}>
            {options}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="times" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    fontWeight: 'bold',
    color: '#888',
    fontSize: 15,
    marginBottom: 5,
  },
  selectButton: {
    backgroundColor: 'rgb(221, 221, 221)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 16,
    color: 'rgb(192, 192, 192)',
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    backgroundColor: '#f2f2f2',
    width: '100%',
    height: 'auto',
    borderRadius: 10,
    padding: 20,
    elevation: 4,
  },
  closeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'royalblue',
    position: 'absolute',
    top: -20,
    right: -15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
});
