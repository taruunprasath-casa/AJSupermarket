import { Product } from "../models/Product.js";
import { SaleItem } from "../models/SaleItem.js";
import { SalesService } from "../SaleItem/salesService.js";
import { ConsoleBillGenerator } from "./BillGenerator.js";
import { Symbols } from "./Symbols.js";
class Command {
    inventory;
    sales;
    offers;
    commandRegistry;
    constructor(inventory, sales, offers) {
        this.inventory = inventory;
        this.sales = sales;
        this.offers = offers;
        this.commandRegistry = new Map([
            ["INVENTORY", { command: new InventoryCommand(), target: inventory }],
            ["STOCK", { command: new StockCommand(), target: inventory }],
            ["SALE", { command: new SalesCommand(), target: sales }],
            ["NEW-OFFER", { command: new OfferCommand(), target: offers }],
        ]);
    }
    execute(input) {
        const commandKey = input.split(Symbols.ARROW)[0] ?? "";
        const entry = this.commandRegistry.get(commandKey);
        if (!entry) {
            throw new Error(`Unknown command: ${commandKey}`);
        }
        entry.command.process(input, entry.target);
    }
}
class InventoryCommand {
    process(input, inventory) {
        const inventoryData = input.split(Symbols.ARROW)[1];
        if (!inventoryData)
            throw new Error("Invalid INVENTORY input format.");
        const [id, name, qty, price] = inventoryData.split(Symbols.PIPE);
        inventory.addProduct(new Product(String(id), String(name), Number(qty), Number(price)));
        inventory.printInventoryUpdate();
    }
}
class SalesCommand {
    process(input, sales) {
        const saleData = input.split(Symbols.ARROW)[1];
        if (!saleData)
            throw new Error("Invalid SALE input format.");
        const items = saleData.split(Symbols.SEMICOLON).map((p) => {
            const [id, qty] = p.split(Symbols.PIPE);
            return new SaleItem(String(id), Number(qty));
        });
        const bill = sales.processSale(items);
        new ConsoleBillGenerator().printBill(bill);
    }
}
class OfferCommand {
    process(input, offers) {
        const offerData = input.split(Symbols.ARROW)[1];
        if (!offerData)
            throw new Error("Invalid OFFER input format.");
        const [code, id, productId, minimumQuantity, discountPercentage] = offerData.split(Symbols.PIPE);
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
class StockCommand {
    process(input, inventory) {
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
export { Command, InventoryCommand, SalesCommand, StockCommand, OfferCommand };
//# sourceMappingURL=commandParser.js.map