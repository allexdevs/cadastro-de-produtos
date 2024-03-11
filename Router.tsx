/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import ListTasks from './src/screens/ListTasks';
import AddTask from './src/screens/AddTask';
import Cart from './src/screens/Cart';
import AddCart from './src/screens/addCart';

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            title: 'Cadastro de Produtos',
            headerStyle: {
              backgroundColor: 'royalblue',
            },
            headerTintColor: 'white',
          }}
          name="Home"
          component={ListTasks}
        />
        <Stack.Screen
          options={{
            title: 'Novo Produto',
            headerStyle: {
              backgroundColor: 'royalblue',
            },
            headerTintColor: 'white',
          }}
          name="Add-Task"
          component={AddTask}
        />
        <Stack.Screen
          options={{
            title: 'Carrinho de Compras',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'royalblue',
            },
          }}
          name="Shopping-Cart"
          component={Cart}
        />
        <Stack.Screen
          options={{
            title: 'Adicionar ao Carrinho',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'royalblue',
            },
          }}
          name="Add-Cart"
          component={AddCart}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
