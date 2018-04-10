import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

    constructor(private db: AngularFireDatabase) { }

    getCategories() {
        // ref is used to apply category value sorting here
        return this.db
            .list('/categories', ref => ref.orderByChild('name'))
            .snapshotChanges();
    }
}
