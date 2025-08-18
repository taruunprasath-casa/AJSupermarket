import type { SaleItem } from "./SaleItem.js";
export interface Offer {
    id: string;
    code: string;
    productId: SaleItem["productId"];
    minimumQuantity: number;
    discountPercentage: number;
}
//# sourceMappingURL=Offer.d.ts.map