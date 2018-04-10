import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

    constructor(private db: AngularFireDatabase) { }

    // get all products
    getProducts() {
        return this.db.list('/products').snapshotChanges().map(action => {
            return action.map(
                item => {
                    const $key = item.payload.key;
                    const data = { $key, ...item.payload.val() };
                    return data;
                });
        });
    }

    // create a new product
    createProduct(product) {
        return this.db.list('/products').push(product);
    }
}
