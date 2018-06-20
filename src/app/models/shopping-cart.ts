import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: {[productId: string]: ShoppingCartItem}) {
        // ensure proper initialization
        this.itemsMap = itemsMap || {};
        if (!itemsMap) return;

        for (const productId of Object.keys(itemsMap)) {
            const item = itemsMap[productId];
            const x = new ShoppingCartItem();
            // copy all the properties of item from Fb into x
            Object.assign(x, item);
            x.key = productId;
            this.items.push(x);
        }
    }

    getQuantity(product: Product) {
        const item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
    }

    get totalPrice() {
        let sum = 0;
        for (const productId in this.items)
            sum +=  this.items[productId].totalPrice;
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (const productId in this.items)
            count += this.items[productId].quantity;
        return count;
    }
}
