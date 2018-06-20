import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private db: AngularFireDatabase) { }

    storeOrder(order) {
        console.log('Successful Order');
        return this.db.list('/orders').push(order);
    }
}
