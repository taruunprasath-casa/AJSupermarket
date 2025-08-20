import { BuyOneGetOneOffer, BuyXMoreOffer, PercentageOffer, type IOfferStrategies, type Offer } from "../models/Offer.js";
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
    return offer.id;
  }

  getOffer(
    productId: SaleItem["productId"],
    quantity: number,
    price: number
  ): Offer | null {
    const applicableOffers = this.offers.filter(
      (offer) =>
        offer.productId === productId && quantity >= offer.minimumQuantity
    );

    if (applicableOffers.length === 0) return null;

    let bestOffer: Offer | null = null;
    let lowestPrice = price;

    for (const offer of applicableOffers) {
      const strategy = this.resolveStrategy(offer.code);
      const discountedPrice = strategy.applyOffer(offer, quantity, price);

      if (discountedPrice < lowestPrice) {
        lowestPrice = discountedPrice;
        bestOffer = offer;
      }
    }

    return bestOffer;
  }

  private resolveStrategy(code: string): IOfferStrategies {
    switch (code) {
      case "PERCENTAGE":
        return new PercentageOffer();
      case "BOGO":
        return new BuyOneGetOneOffer();
      case "BuyXMore":
        return new BuyXMoreOffer();
      default:
        throw new Error(`Unknown offer code: ${code}`);
    }
  }
}
