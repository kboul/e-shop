import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './../models/product';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

    constructor(private db: AngularFireDatabase) { }

    private create() {
        return this.db.list('/shopping-carts').push({
            dateCreated: new Date().getTime()
        });
    }

    private getItem(cartId: string, productId: string) {
        return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
    }

    private async getOrCreateCart() {
        const cartId = localStorage.getItem('cartId');
        // store the cartdId in case client leaves and returns to the page
        if (cartId) { return cartId; }

        // await with async is used to get async data like synch
        const result = await this.create();
        localStorage.setItem('cartId', result.key);
        return result.key;
    }

    async addToCart(product: Product) {
        const cartId = await this.getOrCreateCart();
        const item$ = this.getItem(cartId, product.key);
        item$.snapshotChanges().take(1).subscribe(item => {
            console.log(item.payload);
            if (item.payload.exists()) {
                item$.update({ product: product, quantity: item.payload.val().quantity + 1 });
            } else {
                item$.update({ product: product, quantity: 1 });
            }
        });
    }
}
