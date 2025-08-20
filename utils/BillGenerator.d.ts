import type { Bill } from "../models/Bill.js";
export interface BillGenerator {
    printBill(bill: Bill): void;
}
export declare class ConsoleBillGenerator implements BillGenerator {
    printBill(bill: Bill): void;
}
//# sourceMappingURL=BillGenerator.d.ts.map