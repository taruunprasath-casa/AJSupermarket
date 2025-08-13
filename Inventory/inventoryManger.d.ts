import type { Product } from "../models/Product.js";
export interface IInventoryManager {
    addProduct(product: Product): void;
    getProduct(id: string): Product | undefined;
    updateQuantity(id: string, qty: number): void;
}
export declare class InventoryManager implements IInventoryManager {
    private products;
    addProduct(product: Product): void;
    getProduct(id: string): Product | undefined;
    updateQuantity(id: string, qty: number): void;
}
//# sourceMappingURL=inventoryManger.d.ts.map