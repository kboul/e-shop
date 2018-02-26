import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

    constructor(
        private auth: AuthService,
        private userService: UserService) { }

    canActivate(): Observable<boolean> {
        return this.auth.user$
            .switchMap(user => this.userService.get(user.uid)
            .map(appUSer => appUSer.isAdmin));
    }
}
