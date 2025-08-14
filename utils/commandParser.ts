import type { IInventoryManager } from "../Inventory/inventoryManger.js";
import { Product } from "../models/Product.js";
import { SaleItem } from "../models/SaleItem.js";
import type { ISalesService } from "../SaleItem/salesService.js";
import { ConsoleBillGenerator } from "./consoleBillGenerator.js";

export interface ICommand<T> {
  process(input: string, context: T): void;
}

enum Symbols {
  ARROW = "=>",
  PIPE = "|",
  SEMICOLON = ";",
}

class Command {
  private inventoryCommand = new InventoryCommand();
  private salesCommand = new SalesCommand();
  private stockCommand = new StockCommand();

  constructor(
    public inventory: IInventoryManager,
    public sales: ISalesService
  ) {}

  process(input: string) {
    this.inventoryCommand.process(input, this.inventory);
    this.salesCommand.process(input, this.sales);
    this.stockCommand.process(input, this.inventory);
  }
}

class InventoryCommand implements ICommand<IInventoryManager> {
  process(input: string, inventory: IInventoryManager) {
    if (input.startsWith("INVENTORY")) {
      const inventoryData = input.split(Symbols.ARROW)[1];
      if (!inventoryData) throw new Error("Invalid INVENTORY input format.");

      const [id, name, qty, price] = inventoryData.split(Symbols.PIPE);
      inventory.addProduct(
        new Product(String(id), String(name), Number(qty), Number(price))
      );
      ConsoleBillGenerator.printInventoryUpdate();
    }
  }
}

class SalesCommand implements ICommand<ISalesService> {
  process(input: string, sales: ISalesService) {
    if (input.startsWith("SALE")) {
      const saleData = input.split(Symbols.ARROW)[1];
      if (!saleData) throw new Error("Invalid SALE input format.");

      const items = saleData.split(Symbols.SEMICOLON).map((p) => {
        const [id, qty] = p.split(Symbols.PIPE);
        return new SaleItem(String(id), Number(qty));
      });
      const bill = sales.processSale(items);
      ConsoleBillGenerator.printBill(bill);
    }
  }
}

class StockCommand implements ICommand<IInventoryManager> {
  process(input: string, inventory: IInventoryManager) {
    if (input.startsWith("STOCK")) {
      const id = input.split(Symbols.ARROW)[1];
      if (!id) throw new Error("Invalid STOCK input format.");

      const product = inventory.getProduct(String(id));
      if (product) {
        ConsoleBillGenerator.printStock(product.name, product.quantity);
      } else {
        throw new Error(`Product with ID ${id} not found.`);
      }
    }
  }
}

export { Command, InventoryCommand, SalesCommand, StockCommand };
