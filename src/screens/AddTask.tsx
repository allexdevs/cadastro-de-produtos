/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import InputFormTask from '../components/InputFormTask';
import FloatingActionButton from '../components/FloatingActionButton';
import {addProduct, updateProduct} from '../services/product/product.service';
import Product from '../model/product.model';
import Select from '../components/Select';

export default function AddTask({navigation, route}: any) {
  const [id, setId] = useState<string>();
  const [amount, setAmount] = useState<string>();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>();
  const [unit, setUnit] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const options: any[] = [
    {id: '1', value: 'UN', label: 'Unidade'},
    {id: '2', value: 'L', label: 'Litro'},
    {id: '3', value: 'KG', label: 'Quilo'},
    {id: '4', value: 'CX', label: 'Caixa'},
    {id: '5', value: 'PCT', label: 'Pacote'},
  ];

  const data = {
    nome: name,
    descricao: description,
    quantidade: Number(amount),
    valor: Number(price),
    tipo_unitario: unit,
  };

  const idParam = route.params?.idParam;
  const amountParam = route.params?.amountParam;
  const descriptionParam = route.params?.descriptionParam;
  const nameParam = route.params?.nameParam;
  const priceParam = route.params?.priceParam;
  const unitParam = route.params?.unitParam;

  const checkParams = () => {
    if (idParam) {
      setId(idParam);
      setAmount(amountParam.toString());
      setName(nameParam);
      setDescription(descriptionParam);
      setPrice(priceParam.toString());
      setUnit(unitParam);
    }
  };

  useEffect(() => {
    checkParams();
    navigation.setOptions({
      headerTitle: idParam ? 'Editar Produto' : 'Novo Produto',
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <InputFormTask
          isTextArea={false}
          placeholder="Ex.: Macarrão"
          keyboardType="default"
          onChange={setName}
          value={name}
          label={'Nome do produto'}
        />
        <InputFormTask
          isTextArea={false}
          placeholder="Ex.: 3"
          keyboardType="default"
          onChange={setAmount}
          value={amount}
          label={'Quantidade'}
        />
        <InputFormTask
          isTextArea={false}
          placeholder="Ex.: R$ 2.49"
          keyboardType="default"
          onChange={setPrice}
          value={price}
          label={'Valor'}
        />
        <Select
          label="Tipo unitário"
          value={unit}
          isShow={showModal}
          onClose={() => setShowModal(false)}
          onOpen={() => setShowModal(true)}
          options={
            <FlatList<any>
              data={options}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setUnit(item.value);
                    setShowModal(false);
                  }}
                  style={styles.itemOption}>
                  <Text>
                    {item.value} - {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          }
        />
        <InputFormTask
          isTextArea={true}
          placeholder="Ex.: UN"
          keyboardType="default"
          onChange={setDescription}
          value={description}
          label={'Descrição do produto'}
        />
        <View style={styles.spacer} />
      </ScrollView>
      <FloatingActionButton
        bottom={20}
        right={20}
        width={60}
        height={60}
        bgColor={'royalblue'}
        click={() => {
          if (idParam) {
            const updatedProduct: Product = new Product(
              Number(id),
              name,
              description,
              Number(amount),
              Number(price),
              unit,
            );
            updateProduct(updatedProduct, navigation);
          } else {
            addProduct(data, navigation);
          }
        }}
        iconName="check"
        iconSize={24}
        iconColor="#ffffff"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: '100%',
  },
  spacer: {
    height: 120,
    width: '100%',
  },
  itemOption: {
    backgroundColor: 'rgb(221, 221, 221)',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
});
