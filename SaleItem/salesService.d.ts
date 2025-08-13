import type { IInventoryManager } from "../Inventory/inventoryManger.js";
import { Bill } from "../models/Bill.js";
import type { SaleItem } from "../models/SaleItem.js";
export interface ISalesService {
    processSale(items: SaleItem[]): Bill;
}
export declare class SalesService implements ISalesService {
    private inventory;
    constructor(inventory: IInventoryManager);
    processSale(items: SaleItem[]): Bill;
}
//# sourceMappingURL=salesService.d.ts.map