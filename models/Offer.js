export class PercentageOffer {
    applyOffer(offer, quantity, price) {
        if (quantity >= offer.minimumQuantity) {
            const discountValue = quantity * price * (offer.discountPercentage / 100);
            return price - discountValue;
        }
        return price;
    }
}
export class BuyOneGetOneOffer {
    applyOffer(offer, quantity, price) {
        if (quantity >= offer.minimumQuantity) {
            const eligibleBogs = Math.floor(quantity / 2);
            const discountValue = eligibleBogs * price;
            return price - discountValue;
        }
        return price;
    }
}
export class BuyXMoreOffer {
    applyOffer(offer, quantity, price) {
        if (quantity >= offer.minimumQuantity) {
            const discountValue = quantity * price * (offer.discountPercentage / 100);
            return price - discountValue;
        }
        return price;
    }
}
//# sourceMappingURL=Offer.js.map