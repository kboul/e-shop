import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';
import { AuthService } from './../services/auth.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
    selector: 'check-out',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
    shipping = {};
    cart: ShoppingCart;
    cartSubscription: Subscription;
    userId: string;
    userSubscription: Subscription;

    constructor(
        private shoppingCartService: ShoppingCartService,
        private orderService: OrderService,
        private authService: AuthService,
        private router: Router) {}

    async ngOnInit() {
        const cart$ = await this.shoppingCartService.getCart();
        this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
        this.userSubscription = this.authService.user$
            .subscribe(user => this.userId = user.uid);
    }

    placeOrder() {
        const order = new Order(this.userId, this.shipping, this.cart);
        const result = this.orderService.storeOrder(order);
        this.router.navigate(['/order-success', result.key]);
    }

    ngOnDestroy() {
        this.cartSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    }
}
