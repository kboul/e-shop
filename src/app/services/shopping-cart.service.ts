import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './../models/product';
import { map, take } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable()
export class ShoppingCartService {

    constructor(private db: AngularFireDatabase) { }

    async getCart(): Promise<Observable<ShoppingCart>> {
        const cartId = await this.getOrCreateCartId();
        return this.db.object('/shopping-carts/' + cartId)
            .snapshotChanges().pipe(
                map((x: { payload: { val } } ) => {
                    return new ShoppingCart(x.payload.val().items);
                })
        );
    }

    async addToCart(product: Product) {
        this.updateItemQuantity(product, 1);
    }

    async removeFromCart(product: Product) {
        this.updateItemQuantity(product, -1);
    }

    private create() {
        return this.db.list('/shopping-carts').push({
            dateCreated: new Date().getTime()
        });
    }

    async clearCart() {
        const cartId = await this.getOrCreateCartId();
        console.log(cartId);
        this.db.object('/shopping-carts/' + cartId + '/items').remove();
    }

    private async getOrCreateCartId(): Promise<string> {
        const cartId = localStorage.getItem('cartId');
        // store the cartdId in case client leaves and returns to the page
        if (cartId) return cartId;

        // await with async is used to get async data like synch
        const result = await this.create();
        localStorage.setItem('cartId', result.key);
        return result.key;
    }

    private async updateItemQuantity(product: Product, change: number) {
        const cartId = await this.getOrCreateCartId();
        const item: AngularFireObject<{}> = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
        const itemSnap$ = item.snapshotChanges();

        itemSnap$.pipe(take(1)).subscribe((data: any) => {
            const prod = { key: data.payload.key, ...data.payload.val() };
            const exists: boolean = data.payload.val() !== null;
            console.log('Exists: ', exists);

            if (exists)
                item.update({ product: product, quantity: prod.quantity + change });
            else
                item.set({ product: product, quantity: 0 });
        });
    }
}
