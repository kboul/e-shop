import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { AppUser } from '../models/app-user';
import { Router } from '@angular/router';

@Component({
    selector: 'bs-navbar',
    templateUrl: './bs-navbar.component.html',
    styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
    appUser: AppUser;

    constructor(
        private auth: AuthService,
        private router: Router) {
        auth.appUser$.subscribe(appUser => this.appUser = appUser);
    }

    logout() {
       this.auth.logout();
       this.router.navigate(['/login']);
    }
}
