import type { Offer } from "../models/Offer.js";
import type { SaleItem } from "../models/SaleItem.js";

export interface IOfferProvider {
  createOffer(offer: Offer): string;
  getOffer(
    productId: SaleItem["productId"],
    quantity: number,
    price: number
  ): Offer | null;
}

export class OfferProvider implements IOfferProvider {
  private offers: Offer[] = [];

  createOffer(offer: Offer): string {
    this.offers.push(offer);
    console.log("Offer Added.");
    return offer.code;
  }

  getOffer(
    productId: SaleItem["productId"],
    quantity: number,
    price: number
  ): Offer | null{
    const productOffers = this?.offers.filter((o) => o.productId === productId);
    if (productOffers.length === 0) return null;

    let bestOffer: Offer | null = null;
    let maxDiscountValue = 0;

    for (const offer of productOffers) {
      if (quantity >= offer.minimumQuantity) {
        const discountValue =
          quantity * price * (offer.discountPercentage / 100);
        if (discountValue > maxDiscountValue) {
          maxDiscountValue = discountValue;
          bestOffer = offer;
        }
      }
    }
    return bestOffer;
  }
}
