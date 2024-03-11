/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import {
  getCartProducts,
  searchCartProduct,
  deleteCartProduct,
} from '../services/cart/cart.service';
import CartModel from '../model/cart.model';
import SearchBar from '../components/SearchBar';
import ListCartItem from '../components/ListCartItem';

export default function Cart({navigation}: any) {
  const [cartProducts, setCartProducts] = useState<CartModel[]>([]);
  const [searchValue, setSearchvalue] = useState<string>('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const loadCartProducts = async () => {
        setCartProducts([]);
        setCartProducts(await getCartProducts());
      };
      loadCartProducts();
    });

    return unsubscribe;
  }, [navigation]);

  const removeProduct = (id: number) => {
    Alert.alert('Excluir produto', 'Deseja realmente excluir este produto?', [
      {
        text: 'Não',
        style: 'cancel',
        onPress: () => {
          Alert.alert('Excluir produto', 'Exclusão cancelada');
        },
      },
      {
        text: 'Sim',
        onPress: async () => {
          await deleteCartProduct(id);
          setCartProducts([]);
          setCartProducts(await getCartProducts());
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        label="Pesquisar no carrinho"
        placeholder="Digite o nome do produto"
        isEmpty={!searchValue}
        textValue={searchValue}
        changeValue={setSearchvalue}
        clearText={() => {
          setSearchvalue('');
          const loadCartProducts = async () => {
            setCartProducts([]);
            setCartProducts(await getCartProducts());
          };
          loadCartProducts();
        }}
        searchAction={async () => {
          if (searchValue) {
            setCartProducts([]);
            const response = await searchCartProduct(searchValue);
            setCartProducts(response);
          } else {
            Alert.alert('Pesquisar produto', 'O campo de busca está vazio!');
          }
        }}
      />
      <FlatList<CartModel>
        data={cartProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ListCartItem
            name={item.nome}
            amount={item.quantidade}
            price={item.valor}
            unit={item.tipo_unitario}
            total={item.total}
            onEdit={() =>
              navigation.navigate('Add-Cart', {
                product: item.nome,
                amount: item.quantidade,
                price: item.valor,
                unit: item.tipo_unitario,
                id: item.id,
                total: item.total,
              })
            }
            onDelete={() => removeProduct(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
