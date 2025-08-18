import type { IInventoryManager } from "../Inventory/inventoryManger.js";
import { Bill } from "../models/Bill.js";
import type { SaleItem } from "../models/SaleItem.js";
import type { IOfferProvider } from "../Offer/OfferProvider.js";

export class SalesService {
  constructor(
    private inventory: IInventoryManager,
    private offerService: IOfferProvider
  ) {}

  processSale(items: SaleItem[]): Bill {
    let total = 0;
    const billItems: any[] = [];

    for (const item of items) {
      const product = this.inventory.getProduct(item.productId);
      if (!product) throw new Error("Product not found");

      const unitPrice = product.pricePerUnit;
      const quantity = item.quantity;
      let discountApplied = "N/A";
      let netPrice = unitPrice * quantity;

      const bestOffer = this.offerService.getOffer(
        item.productId,
        quantity,
        unitPrice
      );
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
