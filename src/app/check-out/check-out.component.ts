import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';
import { AuthService } from './../services/auth.service';

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
        private authService: AuthService) {}

    async ngOnInit() {
        const cart$ = await this.shoppingCartService.getCart();
        this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
        this.userSubscription = this.authService.user$
            .subscribe(user => this.userId = user.uid);
    }

    placeOrder() {
        const order = {
            userId: this.userId,
            dataPlaced: new Date().getTime(),
            shipping: this.shipping,
            items: this.cart.items.map(i => {
                return {
                    product: {
                        title: i.title,
                        imageUrl: i.imageUrl,
                        price: i.price
                    },
                    quantity: i.quantity,
                    totalPrice: i.totalPrice
                };
            })
        };

        this.orderService.storeOrder(order);
    }

    ngOnDestroy() {
        this.cartSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    }
}
