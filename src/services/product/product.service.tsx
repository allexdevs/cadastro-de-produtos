/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import ApiService from '../api.service';
import Product from '../../model/product.model';
const apiService = new ApiService('http://192.168.0.5:5000');

export const getProducts = async () => {
  let products: Product[] = [];
  await apiService
    .get('/products')
    .then(result => {
      result.map((product: any) => {
        products.push(
          new Product(
            product.id,
            product.nome,
            product.descricao,
            product.quantidade,
            product.valor,
            product.tipo_unitario,
          ),
        );
      });
    })
    .catch(err => console.log(err));
  return products;
};

export const addProduct = (data: any, action: any) => {
  apiService
    .post('/add-product', data)
    .then(result => {
      result.data.message === 'product inserted successfully'
        ? Alert.alert('Adicionar produto', 'Produto adicionado com sucesso!', [
            {
              text: 'Concluir',
              onPress: () => action.goBack(),
            },
          ])
        : Alert.alert('Adicionar produto', 'Erro, tente novamente!');
    })
    .catch(_err => {
      Alert.alert(
        'Erro',
        'Um erro ocorreu, não foi possível adicionar o produto',
        [
          {
            text: 'Fechar',
            onPress: () => action.goBack(),
          },
        ],
      );
    });
};

export const deleteProduct = async (id: number) => {
  await apiService
    .remove('/delete-product', id)
    .then(result => {
      result.message === 'product deleted successfully'
        ? Alert.alert('Excluir produto', 'Produto excluído com sucesso!')
        : Alert.alert(
            'Excluir produto',
            'Erro, não foi possível concluir a operação, tente novamente',
          );
    })
    .catch(_err => {
      Alert.alert('Excluir produto', 'Erro, a operação foi cancelada');
    });
};

export const updateProduct = (product: Product, action: any) => {
  apiService
    .update('/update-product', product)
    .then(result => {
      result.message === 'product updated successfully'
        ? Alert.alert('Atualizar produto', 'Produto atualizado com sucesso!', [
            {
              text: 'Concluir',
              onPress: () => action.goBack(),
            },
          ])
        : Alert.alert(
            'Atualizar produto',
            'Erro, não foi possível concluir a operação, tente novamente',
          );
    })
    .catch(_err => {
      Alert.alert('Atualizar produto', 'Erro, a operação foi cancelada');
    });
};

export const searchProduct = async (nome: string) => {
  let products: Product[] = [];
  await apiService
    .search('/search-product', nome)
    .then(result => {
      result.map((product: any) => {
        products.push(
          new Product(
            product.id,
            product.nome,
            product.descricao,
            product.quantidade,
            product.valor,
            product.tipo_unitario,
          ),
        );
      });
    })
    .catch(_err => console.log(_err));
  return products;
};
