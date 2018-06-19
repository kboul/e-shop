import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'bs-navbar',
    templateUrl: './bs-navbar.component.html',
    styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
    appUser: AppUser;
    cart$: Observable<ShoppingCart>;

    constructor(
        private auth: AuthService,
        private router: Router,
        private shoppingCartService: ShoppingCartService) {}

    async ngOnInit() {
        this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
        this.cart$ = await this.shoppingCartService.getCart();
    }

    logout() {
       this.auth.logout();
       this.router.navigate(['/login']);
    }
}
