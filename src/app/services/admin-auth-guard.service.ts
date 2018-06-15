
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AdminAuthGuardService implements CanActivate {

    constructor(
        private auth: AuthService,
        private userService: UserService) { }

    canActivate(): Observable<boolean> {
       return this.auth.appUser$.pipe(
            map(appUSer => appUSer.isAdmin));
    }
}
