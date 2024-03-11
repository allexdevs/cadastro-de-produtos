/* eslint-disable prettier/prettier */
import ApiService from '../api.service';
import CartModel from '../../model/cart.model';
import {Alert} from 'react-native';
const apiService = new ApiService('http://192.168.0.5:5000');

export const getCartProducts = async (): Promise<CartModel[]> => {
  let cart: CartModel[] = [];
  await apiService
    .get('/cart')
    .then(result => {
      result.map((cartProduct: any) => {
        cart.push(
          new CartModel(
            cartProduct.id,
            cartProduct.nome,
            cartProduct.quantidade,
            cartProduct.valor,
            cartProduct.tipo_unitario,
            cartProduct.total,
          ),
        );
      });
    })
    .catch(err => console.log(err));
  return cart;
};

export const searchCartProduct = async (name: string): Promise<CartModel[]> => {
  let cartProducts: CartModel[] = [];
  await apiService
    .search('/search-cart', name)
    .then(result => {
      result.map((cartProduct: any) => {
        cartProducts.push(
          new CartModel(
            cartProduct.id,
            cartProduct.nome,
            cartProduct.quantidade,
            cartProduct.valor,
            cartProduct.tipo_unitario,
            cartProduct.total,
          ),
        );
      });
    })
    .catch(_err => console.log(_err));
  return cartProducts;
};

export const addCartProduct = async (
  cartProduct: CartModel,
  action: any,
): Promise<void> => {
  await apiService
    .post('/add-cart', cartProduct)
    .then(result => {
      result.data.message === 'product inserted successfully'
        ? Alert.alert(
            'Adicionar ao carrinho',
            'Produto adicionado com sucesso!',
            [
              {
                text: 'Concluir',
                onPress: () => action.goBack(),
              },
            ],
          )
        : Alert.alert('Adicionar ao carrinho', 'Erro, tente novamente!');
    })
    .catch(_err => {
      console.log(_err);
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

export const updateCartProduct = async (
  cartProduct: CartModel,
  action: any,
): Promise<void> => {
  apiService
    .update('/update-cart', cartProduct)
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

export const deleteCartProduct = async (id: number): Promise<void> => {
  await apiService
    .remove('/delete-cart', id)
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
