import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';

@Component({
    selector: 'check-out',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
    shipping = {};
    cart: ShoppingCart;
    subscription: Subscription;

    constructor(
        private shoppingCartService: ShoppingCartService,
        private orderService: OrderService) {}

    async ngOnInit() {
        const cart$ = await this.shoppingCartService.getCart();
        this.subscription = cart$.subscribe(cart => this.cart = cart);
    }

    placeOrder() {
        const order = {
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
        this.subscription.unsubscribe();
    }
}
