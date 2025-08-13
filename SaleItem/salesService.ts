import type { IInventoryManager } from "../Inventory/inventoryManger.js";
import { Bill } from "../models/Bill.js";
import type { SaleItem } from "../models/SaleItem.js";

export interface ISalesService {
  processSale(items: SaleItem[]): Bill;
}

export class SalesService implements ISalesService {
  constructor(private inventory: IInventoryManager) {}

  processSale(items: SaleItem[]): Bill {
    let total = 0;
    const billItems = [];

    for (const saleItem of items) {
      const product = this.inventory.getProduct(saleItem.productId);
      if (!product || product.quantity < saleItem.quantity) {
        throw new Error(
          `Insufficient stock for Product ID ${saleItem.productId}`
        );
      }

      const netPrice = product.pricePerUnit * saleItem.quantity;
      total += netPrice;
      billItems.push({
        product,
        qty: saleItem.quantity,
        netPrice,
      });

      this.inventory.updateQuantity(
        product.id,
        product.quantity - saleItem.quantity
      );
    }

    return new Bill(billItems, total);
  }
}
