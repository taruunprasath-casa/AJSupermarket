import type { Product } from "./Product.js";
export declare class Bill {
    items: {
        product: Product;
        qty: number;
        netPrice: number;
    }[];
    total: number;
    constructor(items: {
        product: Product;
        qty: number;
        netPrice: number;
    }[], total: number);
}
//# sourceMappingURL=Bill.d.ts.map