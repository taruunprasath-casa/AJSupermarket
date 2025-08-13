import type { IInventoryManager } from "../Inventory/inventoryManger.js";
import type { ISalesService } from "../SaleItem/salesService.js";
export declare class CommandParser {
    private inventory;
    private sales;
    constructor(inventory: IInventoryManager, sales: ISalesService);
    process(input: string): void;
}
//# sourceMappingURL=commandParser.d.ts.map