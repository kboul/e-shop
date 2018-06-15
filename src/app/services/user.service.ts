import { Observable } from 'rxjs';
import { AppUser } from './../models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

    constructor(private db: AngularFireDatabase) { }

    save(user: firebase.User) {
        this.db.object('/users/' + user.uid).update({
            name: user.displayName,
            email: user.email
        });
    }

    // get the uid of the user to extract if he is admin
    get(uid: string): Observable<any> {
        return this.db.object('/users/' + uid).valueChanges();
    }
}
