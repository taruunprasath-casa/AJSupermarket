import type { Bill } from "../models/Bill.js";

export class BillGenerator {
  static printInventoryUpdate() {
    console.log("Inventory Updated.");
  }

  static printBill(bill: Bill) {
    console.log("== Bill ==");
    bill.items.forEach(item => {
      console.log(
        `${item.product.id} - ${item.product.name} - ${item.qty} - ${item.product.pricePerUnit} - ${item.netPrice}`
      );
    });
    console.log("== Total ==");
    console.log(bill.total);
    console.log("========");
  }

  static printStock(productName: string, qty: number) {
    console.log(`${productName} - ${qty}`);
  }
}
