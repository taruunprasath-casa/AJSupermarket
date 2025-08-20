import { type Offer } from "../models/Offer.js";
import type { SaleItem } from "../models/SaleItem.js";
export interface IOfferProvider {
    createOffer(offer: Offer): string;
    getOffer(productId: SaleItem["productId"], quantity: number, price: number): Offer | null;
}
export declare class OfferProvider implements IOfferProvider {
    private offers;
    createOffer(offer: Offer): string;
    getOffer(productId: SaleItem["productId"], quantity: number, price: number): Offer | null;
    private resolveStrategy;
}
//# sourceMappingURL=OfferProvider.d.ts.map