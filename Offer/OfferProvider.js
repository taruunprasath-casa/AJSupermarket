import { BuyOneGetOneOffer, BuyXMoreOffer, PercentageOffer } from "../models/Offer.js";
export class OfferProvider {
    offers = [];
    createOffer(offer) {
        this.offers.push(offer);
        return offer.id;
    }
    getOffer(productId, quantity, price) {
        const applicableOffers = this.offers.filter((offer) => offer.productId === productId && quantity >= offer.minimumQuantity);
        if (applicableOffers.length === 0)
            return null;
        let bestOffer = null;
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
    resolveStrategy(code) {
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
//# sourceMappingURL=OfferProvider.js.map