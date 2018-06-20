import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from './../services/order.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-my-orders',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
    orders;
    subscription: Subscription;

    constructor(private orderService: OrderService) {}

    ngOnInit() {
        this.subscription = this.orderService.getOrders()
            .subscribe(x => this.orders = x);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
