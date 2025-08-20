import type { SaleItem } from "./SaleItem.js";

export interface Offer {
  id: string;                           
  code: string;                         
  productId: SaleItem["productId"];     
  minimumQuantity: number;              
  discountPercentage: number;
  
  
}

export interface IOfferStrategies{
  applyOffer(offer: Offer, quantity: number, price: number): number;
}

export class PercentageOffer implements IOfferStrategies {
  applyOffer(offer: Offer, quantity: number, price: number): number {
    if (quantity >= offer.minimumQuantity) {
      const discountValue = quantity * price * (offer.discountPercentage / 100);
      return price - discountValue;
    }
    return price;
  }
}

export class BuyOneGetOneOffer implements IOfferStrategies {
  applyOffer(offer: Offer, quantity: number, price: number): number {
    if (quantity >= offer.minimumQuantity) {
      const eligibleBogs = Math.floor(quantity / 2);
      const discountValue = eligibleBogs * price;
      return price - discountValue;
    }
    return price;
  }
}

export class BuyXMoreOffer implements IOfferStrategies {
  applyOffer(offer: Offer, quantity: number, price: number): number {
    if (quantity >= offer.minimumQuantity) {
      const discountValue = quantity * price * (offer.discountPercentage / 100);
      return price - discountValue;
    }
    return price;
  }
}