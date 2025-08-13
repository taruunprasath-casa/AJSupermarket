export class InventoryManager {
    products = new Map();
    addProduct(product) {
        this.products.set(product.id, product);
    }
    getProduct(id) {
        return this.products.get(id);
    }
    updateQuantity(id, qty) {
        const product = this.products.get(id);
        if (product) {
            product.quantity = qty;
        }
    }
}
//# sourceMappingURL=inventoryManger.js.map