import * as readline from "readline";
import { InventoryManager } from "./Inventory/inventoryManger.js";
import { SalesService } from "./SaleItem/salesService.js";
import { Command } from "./utils/commandParser.js";
import { OfferProvider } from "./Offer/OfferProvider.js";

const inventory = new InventoryManager();

const offers = new OfferProvider();

const sales = new SalesService(inventory, offers);

const parser = new Command(inventory, sales, offers);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("POS System Started. Enter commands:");

rl.on("line", (input) => {
  try {
    parser.execute(input.trim());
  } catch (err: any) {
    console.error(err.message);
  }
});
