import type { IInventoryManager } from "../Inventory/inventoryManger.js";
import { Bill } from "../models/Bill.js";
import type { SaleItem } from "../models/SaleItem.js";
import type { IOfferProvider } from "../Offer/OfferProvider.js";
export declare class SalesService {
    private inventory;
    private offerService;
    constructor(inventory: IInventoryManager, offerService: IOfferProvider);
    processSale(items: SaleItem[]): Bill;
}
//# sourceMappingURL=salesService.d.ts.map