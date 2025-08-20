import type { Bill } from "../models/Bill.js";

export interface BillGenerator {
   printBill(bill: Bill): void;
}

export class ConsoleBillGenerator implements BillGenerator {
   printBill(bill: Bill): void {
    console.log("== Bill ==");
    bill.items.forEach((item) => {
      console.log(
        `${item.product.id} - ${item.product.name} - ${item.qty} - ${item.offerId} - ${item.product.pricePerUnit} - ${item.netPrice}`
      );
    });
    console.log("== Total ==");
    console.log(bill.total);
    console.log("========");
  }
}
