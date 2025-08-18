import type { IInventoryManager } from "../Inventory/inventoryManger.js";
import type { IOfferProvider } from "../Offer/OfferProvider.js";
import { SalesService } from "../SaleItem/salesService.js";
export interface ICommand<T> {
    process(input: string, target: T): void;
}
declare class Command {
    private inventory;
    private sales;
    private offers;
    private commandRegistry;
    constructor(inventory: IInventoryManager, sales: SalesService, offers: IOfferProvider);
    execute(input: string): void;
}
declare class InventoryCommand implements ICommand<IInventoryManager> {
    process(input: string, inventory: IInventoryManager): void;
}
declare class SalesCommand implements ICommand<SalesService> {
    process(input: string, sales: SalesService): void;
}
declare class OfferCommand implements ICommand<IOfferProvider> {
    process(input: string, offers: IOfferProvider): void;
}
declare class StockCommand implements ICommand<IInventoryManager> {
    process(input: string, inventory: IInventoryManager): void;
}
export { Command, InventoryCommand, SalesCommand, StockCommand, OfferCommand };
//# sourceMappingURL=commandParser.d.ts.map