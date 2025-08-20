import type { IInventoryManager } from "../Inventory/inventoryManger.js";
import { Product } from "../models/Product.js";
import { SaleItem } from "../models/SaleItem.js";
import type { IOfferProvider } from "../Offer/OfferProvider.js";
import { SalesService } from "../SaleItem/salesService.js";
import { ConsoleBillGenerator } from "./BillGenerator.js";
import { Symbols } from "./Symbols.js";

export interface ICommand<T> {
  process(input: string, target: T): void;
}
type CommandEntry<T> = {
  command: ICommand<T>;
  target: T;
};

class Command {
  private commandRegistry: Map<string, CommandEntry<any>>;

  constructor(
    private inventory: IInventoryManager,
    private sales: SalesService,
    private offers: IOfferProvider
  ) {
    this.commandRegistry = new Map<string, CommandEntry<any>>([
      ["INVENTORY", { command: new InventoryCommand(), target: inventory }],
      ["STOCK", { command: new StockCommand(), target: inventory }],
      ["SALE", { command: new SalesCommand(), target: sales }],
      ["NEW-OFFER", { command: new OfferCommand(), target: offers }],
    ]);
  }

  public execute(input: string) {
    const commandKey = input.split(Symbols.ARROW)[0] ?? "";
    const entry = this.commandRegistry.get(commandKey);

    if (!entry) {
      throw new Error(`Unknown command: ${commandKey}`);
    }

    entry.command.process(input, entry.target);
  }
}

class InventoryCommand implements ICommand<IInventoryManager> {
  public process(input: string, inventory: IInventoryManager) {
    const inventoryData = input.split(Symbols.ARROW)[1];
    if (!inventoryData) throw new Error("Invalid INVENTORY input format.");

    const [id, name, qty, price] = inventoryData.split(Symbols.PIPE);
    inventory.addProduct(
      new Product(String(id), String(name), Number(qty), Number(price))
    );
    inventory.printInventoryUpdate();
  }
}

class SalesCommand implements ICommand<SalesService> {
  public process(input: string, sales: SalesService) {
    const saleData = input.split(Symbols.ARROW)[1];
    if (!saleData) throw new Error("Invalid SALE input format.");

    const items = saleData.split(Symbols.SEMICOLON).map((p) => {
      const [id, qty] = p.split(Symbols.PIPE);
      return new SaleItem(String(id), Number(qty));
    });

    const bill = sales.processSale(items);
    new ConsoleBillGenerator().printBill(bill);
  }
}

class OfferCommand implements ICommand<IOfferProvider> {
  public process(input: string, offers: IOfferProvider) {
    const offerData = input.split(Symbols.ARROW)[1];
    if (!offerData) throw new Error("Invalid OFFER input format.");

    const [code, id, productId, minimumQuantity, discountPercentage] =
      offerData.split(Symbols.PIPE);

    offers.createOffer({
      id: String(id),
      code: String(code),
      productId: String(productId),
      minimumQuantity: Number(minimumQuantity),
      discountPercentage: Number(discountPercentage),
    });
    console.log("Offer added");
  }
}

class StockCommand implements ICommand<IInventoryManager> {
  public process(input: string, inventory: IInventoryManager) {
    const id = input.split(Symbols.ARROW)[1];
    if (!id) throw new Error("Invalid STOCK input format.");

    const product = inventory.getProduct(String(id));
    if (product) {
      inventory.printStock(product.name, product.quantity);
    } else {
      throw new Error(`Product with ID ${id} not found.`);
    }
  }
}

export { Command, InventoryCommand, SalesCommand, StockCommand, OfferCommand };
