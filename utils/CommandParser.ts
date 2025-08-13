import type { IInventoryManager } from "../Inventory/InventoryManger.js";
import { Product } from "../models/Product.js";
import { SaleItem } from "../models/SaleItem.js";
import type { ISalesService } from "../SaleItem/SalesService.js";
import { BillGenerator } from "./BillGenerator.js";

export class CommandParser {
  constructor(
    private inventory: IInventoryManager,
    private sales: ISalesService
  ) {}

  process(input: string) {
    if (input.startsWith("INVENTORY=>")) {
      const inventoryData = input.split("=>")[1];
      if (!inventoryData) {
        throw new Error("Invalid INVENTORY input format.");
      }
      const [id, name, qty, price] = inventoryData.split("|");
      this.inventory.addProduct(
        new Product(String(id), String(name), Number(qty), Number(price))
      );
      BillGenerator.printInventoryUpdate();
    } else if (input.startsWith("SALE=>")) {
      const saleData = input.split("=>")[1];
      if (!saleData) {
        throw new Error("Invalid SALE input format.");
      }
      const items = saleData.split(";").map((p) => {
        const [id, qty] = p.split("|");
        return new SaleItem(String(id), Number(qty));
      });
      const bill = this.sales.processSale(items);
      BillGenerator.printBill(bill);
    } else if (input.startsWith("STOCK=>")) {
      const id = input.split("=>")[1];
      const product = this.inventory.getProduct(String(id));
      if (product) {
        BillGenerator.printStock(product.name, product.quantity);
      }
    }
  }
}
