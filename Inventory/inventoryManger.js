export class InventoryManager {
    products = new Map();
    addProduct(product) {
        this.products.set(product.id, product);
    }
    getProduct(id) {
        return this.products.get(id);
    }
    updateQuantity(product, qty) {
        if (product) {
            product.quantity = qty;
        }
    }
}
//# sourceMappingURL=inventoryManger.js.map