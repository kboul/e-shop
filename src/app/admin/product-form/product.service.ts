import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

    constructor(private db: AngularFireDatabase) { }

    create(product) {
        this.db.list('/products').push(product);
    }
}
