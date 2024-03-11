/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import InputFormTask from '../components/InputFormTask';
import FloatingActionButton from '../components/FloatingActionButton';
import {addCartProduct, updateCartProduct} from '../services/cart/cart.service';
import CartModel from '../model/cart.model';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function AddCart({navigation, route}: any): React.JSX.Element {
  const [id, setId] = useState<number>();
  const [product, setProduct] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [amount, setAmount] = useState<number>(1);

  const increment = () => {
    let value: number = amount;
    value++;
    setAmount(value);
  };

  const decrement = () => {
    let value: number = amount;
    value <= 1 ? setAmount(1) : setAmount(amount - 1);
  };

  const calculateTotal = (amountValue: number, priceValue: number): number => {
    let result: number = 0;
    result = amountValue * priceValue;
    return result;
  };

  useEffect(() => {
    setProduct(route.params?.product);
    setUnit(route.params?.unit);
    setPrice(route.params?.price.toString());
    route.params.id ? setAmount(route.params?.amount) : setAmount(1);
    setId(route.params?.id);
  }, [route, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.balance}>
        Total: R$ {calculateTotal(Number(amount), Number(price)).toFixed(2)}
      </Text>
      <InputFormTask
        value={product}
        onChange={setProduct}
        placeholder="Nome do produto"
        keyboardType="default"
        isTextArea={false}
        isDisabled={false}
        label="Nome do produto"
      />
      <View style={styles.row}>
        <InputFormTask
          value={unit}
          onChange={setProduct}
          placeholder="UN"
          keyboardType="default"
          isTextArea={false}
          isDisabled={false}
          label="Tipo unitário"
          width={Dimensions.get('screen').width / 3}
        />
        <InputFormTask
          value={price}
          onChange={setProduct}
          placeholder="R$ 0,00"
          keyboardType="default"
          isTextArea={false}
          isDisabled={false}
          label="Preço"
          width={Dimensions.get('screen').width / 3}
        />
      </View>
      <View style={styles.row}>
        <InputFormTask
          value={amount?.toString()}
          onChange={setProduct}
          placeholder="R$ 0,00"
          keyboardType="default"
          isTextArea={false}
          isDisabled={false}
          label="Quantidade"
          width={Dimensions.get('screen').width / 3}
        />
        <View
          style={[styles.row, {width: Dimensions.get('screen').width / 2.5}]}>
          <TouchableOpacity style={styles.actionButton} onPress={decrement}>
            <Icon name="minus" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={increment}>
            <Icon name="plus" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
      <FloatingActionButton
        bgColor="royalblue"
        width={60}
        height={60}
        bottom={20}
        right={20}
        iconName={id ? 'check' : 'plus'}
        iconSize={24}
        iconColor="#ffffff"
        click={() => {
          if (id) {
            const updatedCartProduct: CartModel = new CartModel(
              id,
              product,
              amount,
              Number(price),
              unit,
              calculateTotal(amount, parseFloat(price)),
            );
            updateCartProduct(updatedCartProduct, navigation);
          } else {
            const newCartProduct: CartModel = new CartModel(
              0,
              product,
              amount,
              Number(price),
              unit,
              calculateTotal(amount, parseFloat(price)),
            );
            addCartProduct(newCartProduct, navigation);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: 'royalblue',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 10,
    elevation: 4,
  },
  actionButtonIcon: {
    width: 24,
    height: 24,
  },
  balance: {
    fontSize: 32,
    marginBottom: 15,
  },
});
