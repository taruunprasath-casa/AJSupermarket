import type { Quantity } from "./Quantity.js";

export class Product {
  constructor(
    public id: string,
    public name: string,
    public quantity: Quantity["value"],
    public pricePerUnit: number
  ) {}
}
