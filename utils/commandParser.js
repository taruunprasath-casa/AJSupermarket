import { Product } from "../models/Product.js";
import { SaleItem } from "../models/SaleItem.js";
import { ConsoleBillGenerator } from "./consoleBillGenerator.js";
var Symbols;
(function (Symbols) {
    Symbols["ARROW"] = "=>";
    Symbols["PIPE"] = "|";
    Symbols["SEMICOLON"] = ";";
})(Symbols || (Symbols = {}));
class Command {
    inventory;
    sales;
    inventoryCommand = new InventoryCommand();
    salesCommand = new SalesCommand();
    stockCommand = new StockCommand();
    constructor(inventory, sales) {
        this.inventory = inventory;
        this.sales = sales;
    }
    process(input) {
        this.inventoryCommand.process(input, this.inventory);
        this.salesCommand.process(input, this.sales);
        this.stockCommand.process(input, this.inventory);
    }
}
class InventoryCommand {
    process(input, inventory) {
        if (input.startsWith("INVENTORY")) {
            const inventoryData = input.split(Symbols.ARROW)[1];
            if (!inventoryData)
                throw new Error("Invalid INVENTORY input format.");
            const [id, name, qty, price] = inventoryData.split(Symbols.PIPE);
            inventory.addProduct(new Product(String(id), String(name), Number(qty), Number(price)));
            inventory.printInventoryUpdate();
        }
    }
}
class SalesCommand {
    process(input, sales) {
        if (input.startsWith("SALE")) {
            const saleData = input.split(Symbols.ARROW)[1];
            if (!saleData)
                throw new Error("Invalid SALE input format.");
            const items = saleData.split(Symbols.SEMICOLON).map((p) => {
                const [id, qty] = p.split(Symbols.PIPE);
                return new SaleItem(String(id), Number(qty));
            });
            const bill = sales.processSale(items);
            ConsoleBillGenerator.printBill(bill);
        }
    }
}
class StockCommand {
    process(input, inventory) {
        if (input.startsWith("STOCK")) {
            const id = input.split(Symbols.ARROW)[1];
            if (!id)
                throw new Error("Invalid STOCK input format.");
            const product = inventory.getProduct(String(id));
            if (product) {
                inventory.printStock(product.name, product.quantity);
            }
            else {
                throw new Error(`Product with ID ${id} not found.`);
            }
        }
    }
}
export { Command, InventoryCommand, SalesCommand, StockCommand };
//# sourceMappingURL=commandParser.js.map