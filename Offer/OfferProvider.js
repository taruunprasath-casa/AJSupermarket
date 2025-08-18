export class OfferProvider {
    offers = [];
    createOffer(offer) {
        this.offers.push(offer);
        console.log("Offer Added.");
        return offer.code;
    }
    getOffer(productId, quantity, price) {
        const productOffers = this?.offers.filter((o) => o.productId === productId);
        if (productOffers.length === 0)
            return null;
        let bestOffer = null;
        let maxDiscountValue = 0;
        for (const offer of productOffers) {
            if (quantity >= offer.minimumQuantity) {
                const discountValue = quantity * price * (offer.discountPercentage / 100);
                if (discountValue > maxDiscountValue) {
                    maxDiscountValue = discountValue;
                    bestOffer = offer;
                }
            }
        }
        return bestOffer;
    }
}
//# sourceMappingURL=OfferProvider.js.map