import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthService {
    user$: Observable<firebase.User>;

    constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) {
        this.user$ = afAuth.authState;
    }

    login() {
        // store the queryParam to a local variable to get redirected after loggin in
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        localStorage.setItem('returnUrl', returnUrl);

        this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }

    logout() {
        this.afAuth.auth.signOut();
    }
}
