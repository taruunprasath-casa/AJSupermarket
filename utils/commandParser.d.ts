import type { IInventoryManager } from "../Inventory/inventoryManger.js";
import type { ISalesService } from "../SaleItem/salesService.js";
export interface ICommand<T> {
    process(input: string, context: T): void;
}
declare class Command {
    inventory: IInventoryManager;
    sales: ISalesService;
    private inventoryCommand;
    private salesCommand;
    private stockCommand;
    constructor(inventory: IInventoryManager, sales: ISalesService);
    process(input: string): void;
}
declare class InventoryCommand implements ICommand<IInventoryManager> {
    process(input: string, inventory: IInventoryManager): void;
}
declare class SalesCommand implements ICommand<ISalesService> {
    process(input: string, sales: ISalesService): void;
}
declare class StockCommand implements ICommand<IInventoryManager> {
    process(input: string, inventory: IInventoryManager): void;
}
export { Command, InventoryCommand, SalesCommand, StockCommand };
//# sourceMappingURL=commandParser.d.ts.map