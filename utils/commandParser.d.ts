import type { IInventoryManager } from "../Inventory/inventoryManger.js";
import type { ISalesService } from "../SaleItem/salesService.js";
declare class Command {
    inventory: IInventoryManager;
    sales: ISalesService;
    private inventoryCommand;
    private salesCommand;
    private stockCommand;
    constructor(inventory: IInventoryManager, sales: ISalesService);
    process(input: string): void;
}
declare class InventoryCommand {
    process(input: string, inventory: IInventoryManager): void;
}
declare class SalesCommand {
    process(input: string, sales: ISalesService): void;
}
declare class StockCommand {
    process(input: string, inventory: IInventoryManager): void;
}
export { Command, InventoryCommand, SalesCommand, StockCommand };
//# sourceMappingURL=commandParser.d.ts.map