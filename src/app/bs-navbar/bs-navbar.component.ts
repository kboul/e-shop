import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';

@Component({
    selector: 'bs-navbar',
    templateUrl: './bs-navbar.component.html',
    styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

    user;

    constructor(private afAuth: AngularFireAuth) {
        afAuth.authState.subscribe((user) => {
            console.log(user);
            this.user = user;
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

}
