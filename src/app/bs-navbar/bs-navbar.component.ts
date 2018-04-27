import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
    selector: 'bs-navbar',
    templateUrl: './bs-navbar.component.html',
    styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
    appUser: AppUser;
    shoppingCartItemCount: number;

    constructor(
        private auth: AuthService,
        private router: Router,
        private shoppingCartService: ShoppingCartService) {}

    async ngOnInit() {
        this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
        const cart$ = await this.shoppingCartService.getCart();
        cart$.valueChanges().subscribe(cart => {
            this.shoppingCartItemCount = 0;
            if (!cart) { return; }
            for (const productId of Object.keys(cart.items)) {
                this.shoppingCartItemCount += cart.items[productId].quantity;
            }
        });
    }

    logout() {
       this.auth.logout();
       this.router.navigate(['/login']);
    }
}
