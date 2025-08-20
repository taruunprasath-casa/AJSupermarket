import type { SaleItem } from "./SaleItem.js";
export interface Offer {
    id: string;
    code: string;
    productId: SaleItem["productId"];
    minimumQuantity: number;
    discountPercentage: number;
}
export interface IOfferStrategies {
    applyOffer(offer: Offer, quantity: number, price: number): number;
}
export declare class PercentageOffer implements IOfferStrategies {
    applyOffer(offer: Offer, quantity: number, price: number): number;
}
export declare class BuyOneGetOneOffer implements IOfferStrategies {
    applyOffer(offer: Offer, quantity: number, price: number): number;
}
export declare class BuyXMoreOffer implements IOfferStrategies {
    applyOffer(offer: Offer, quantity: number, price: number): number;
}
//# sourceMappingURL=Offer.d.ts.map