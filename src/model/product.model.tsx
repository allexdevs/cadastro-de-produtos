/* eslint-disable prettier/prettier */
class Product {
  id: number;
  nome: string;
  descricao: string;
  quantidade: number;
  valor: number;
  tipo_unitario: string;

  constructor(
    id: number,
    nome: string,
    descricao: string,
    quantidade: number,
    valor: number,
    tipo_unitario: string,
  ) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.quantidade = quantidade;
    this.valor = valor;
    this.tipo_unitario = tipo_unitario;
  }
}

export default Product;
