import { Bill } from "../models/Bill.js";
export class SalesService {
    inventory;
    offerService;
    constructor(inventory, offerService) {
        this.inventory = inventory;
        this.offerService = offerService;
    }
    processSale(items) {
        let total = 0;
        const billItems = [];
        for (const item of items) {
            const product = this.inventory.getProduct(item.productId);
            if (!product)
                throw new Error("Product not found");
            const unitPrice = product.pricePerUnit;
            const quantity = item.quantity;
            let discountApplied = "N/A";
            let netPrice = unitPrice * quantity;
            const bestOffer = this.offerService.getBestOffer(item.productId, quantity, unitPrice);
            if (bestOffer) {
                const discountAmount = netPrice * (bestOffer.discountPercentage / 100);
                netPrice -= discountAmount;
                discountApplied = bestOffer.id;
            }
            total += netPrice;
            billItems.push({
                product,
                qty: quantity,
                offerId: discountApplied,
                netPrice,
            });
            this.inventory.updateQuantity(product, quantity);
        }
        return new Bill(billItems, total);
    }
}
//# sourceMappingURL=salesService.js.map