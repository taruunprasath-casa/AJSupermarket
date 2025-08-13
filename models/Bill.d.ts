import type { Product } from "./Product.js";
export declare class Bill {
    items: {
        product: Product;
        qty: number;
        offerId: string;
        netPrice: number;
    }[];
    total: number;
    constructor(items: {
        product: Product;
        qty: number;
        offerId: string;
        netPrice: number;
    }[], total: number);
}
//# sourceMappingURL=Bill.d.ts.map