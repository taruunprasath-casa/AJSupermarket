import type { Product } from "../models/Product.js";

export interface IInventoryManager {
  addProduct(product: Product): void;
  getProduct(id: string): Product | undefined;
  updateQuantity(product: Product, qty: number): void;
}

export class InventoryManager implements IInventoryManager {
  private products = new Map<string, Product>();

  addProduct(product: Product): void {
    this.products.set(product.id, product);
  }

  getProduct(id: string): Product | undefined {
    return this.products.get(id);
  }

  updateQuantity(product: Product, qty: number): void {
    if (product) {
      product.quantity = qty;
    }
  }
}
