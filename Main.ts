import * as readline from "readline";
import { InventoryManager } from "./Inventory/InventoryManger.js";
import { SalesService } from "./SaleItem/SalesService.js";
import { CommandParser } from "./utils/CommandParser.js";

const inventory = new InventoryManager();
const sales = new SalesService(inventory);
const parser = new CommandParser(inventory, sales);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("POS System Started. Enter commands:");

rl.on("line", (input) => {
  try {
    parser.process(input.trim());
  } catch (err: any) {
    console.error(err.message);
  }
});
