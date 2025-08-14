import * as readline from "readline";
import { InventoryManager } from "./Inventory/inventoryManger.js";
import { SalesService } from "./SaleItem/salesService.js";
import { Command } from "./utils/commandParser.js";
const inventory = new InventoryManager();
const sales = new SalesService(inventory);
const parser = new Command(inventory, sales);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
console.log("POS System Started. Enter commands:");
rl.on("line", (input) => {
    try {
        parser.process(input.trim());
    }
    catch (err) {
        console.error(err.message);
    }
});
//# sourceMappingURL=main.js.map