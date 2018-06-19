import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: {[productId: string]: ShoppingCartItem}) {
        for (const productId in itemsMap)
            this.items.push(itemsMap[productId]);
    }

    get totalItemsCount() {
        let count = 0;
        for (const productId in this.items)
            count += this.items[productId].quantity;
        return count;
    }
}
