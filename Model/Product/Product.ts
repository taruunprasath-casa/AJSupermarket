class Product {
  id: string;
  name: string;
  price: number;
  quantity: string;

  constructor(id: string, name: string, price: number, quantity: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

export default Product;
