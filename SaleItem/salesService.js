import { Bill } from "../models/Bill.js";
export class SalesService {
    inventory;
    constructor(inventory) {
        this.inventory = inventory;
    }
    processSale(items) {
        let total = 0;
        const billItems = [];
        for (const saleItem of items) {
            const product = this.inventory.getProduct(saleItem.productId);
            if (!product || product.quantity < saleItem.quantity) {
                throw new Error(`Insufficient stock for Product ID ${saleItem.productId}`);
            }
            const netPrice = product.pricePerUnit * saleItem.quantity;
            total += netPrice;
            billItems.push({
                product,
                qty: saleItem.quantity,
                offerId: "N/A",
                netPrice,
            });
            this.inventory.updateQuantity(product.id, product.quantity - saleItem.quantity);
        }
        return new Bill(billItems, total);
    }
}
//# sourceMappingURL=salesService.js.map