/* eslint-disable prettier/prettier */
class CartModel {
  id: number;
  nome: string;
  quantidade: number;
  valor: number;
  tipo_unitario: string;
  total: number;

  constructor(
    id: number,
    nome: string,
    quantidade: number,
    valor: number,
    tipo_unitario: string,
    total: number,
  ) {
    this.id = id;
    this.nome = nome;
    this.quantidade = quantidade;
    this.tipo_unitario = tipo_unitario;
    this.valor = valor;
    this.total = total;
  }
}

export default CartModel;
