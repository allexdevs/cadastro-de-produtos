/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
  Text,
} from 'react-native';
import FloatingActionButton from '../components/FloatingActionButton';
import TaskItem from '../components/TaskItem';
import {
  getProducts,
  deleteProduct,
  searchProduct,
} from '../services/product/product.service';
import Product from '../model/product.model';
import SearchBar from '../components/SearchBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ListTasks({navigation}: any) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const loadProducts = async () => {
        setProducts([]);
        setProducts(await getProducts());
      };
      loadProducts();
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
          await deleteProduct(id);
          setProducts([]);
          setProducts(await getProducts());
        },
      },
    ]);
  };

  return (
    <View
      style={[
        styles.container,
        // {backgroundColor: products.length <= 0 ? 'white' : '#f2f2f2'},
      ]}>
      <SearchBar
        label="Pesquisar produto"
        placeholder="Digite o nome do produto"
        textValue={searchValue}
        isEmpty={!searchValue}
        clearText={() => {
          setSearchValue('');
          const loadProducts = async () => {
            setProducts([]);
            setProducts(await getProducts());
          };
          loadProducts();
        }}
        changeValue={setSearchValue}
        searchAction={async () => {
          if (searchValue) {
            setProducts([]);
            const response = await searchProduct(searchValue);
            setProducts(response);
          } else {
            Alert.alert('Pesquisar produto', 'O campo de busca está vazio!');
          }
        }}
      />
      <FlatList<Product>
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TaskItem
            onAdd={() =>
              navigation.navigate('Add-Cart', {
                product: item.nome,
                unit: item.tipo_unitario,
                price: item.valor,
              })
            }
            onEdit={() => {
              setTimeout(() => {
                navigation.navigate('Add-Task', {
                  idParam: item.id,
                  amountParam: item.quantidade,
                  descriptionParam: item.descricao,
                  nameParam: item.nome,
                  priceParam: item.valor,
                  unitParam: item.tipo_unitario,
                });
              }, 200);
            }}
            name={item.nome}
            amount={item.quantidade}
            price={item.valor}
            onDelete={() => removeProduct(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.containerImage}>
            <Icon
              name="alert-circle-outline"
              size={82}
              color="rgb(211, 211, 211)"
            />
            <Text style={styles.message}>A lista está vazia</Text>
          </View>
        }
        ListFooterComponent={<View style={styles.spacer} />}
      />
      <FloatingActionButton
        bottom={20}
        right={20}
        width={60}
        height={60}
        bgColor={'royalblue'}
        click={() => {
          setTimeout(() => {
            navigation.navigate('Add-Task');
          }, 200);
        }}
        iconName="plus"
        iconSize={24}
        iconColor="#ffffff"
      />
      <FloatingActionButton
        bottom={100}
        right={30}
        width={45}
        height={45}
        bgColor={'royalblue'}
        click={() => {
          setTimeout(() => {
            navigation.navigate('Shopping-Cart');
          }, 200);
        }}
        iconName="cart-shopping"
        iconSize={18}
        iconColor="#ffffff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  image: {
    width: 200,
    height: 200,
  },
  containerImage: {
    height: Dimensions.get('window').height - 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    height: 140,
    width: '100%',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(178, 178, 178)',
    marginTop: 15,
  },
});
