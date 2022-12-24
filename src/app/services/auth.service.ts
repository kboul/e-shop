import { of as observableOf, Observable } from "rxjs";

import { switchMap } from "rxjs/operators";
import { UserService } from "./user.service";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";
import { ActivatedRoute } from "@angular/router";
import { AppUser } from "../models/app-user";

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    // store the queryParam to a local variable to get redirected after loggin in
    const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.userService.get(user.uid);
        }

        return observableOf(null);
      })
    );
  }
}
