import type { Product } from "./Product.js";

export class Bill {
  constructor(
    public items: {
      product: Product;
      qty: number;
      offerId: string;
      netPrice: number;
    }[],
    public total: number
  ) {}
}
