import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './../services/shopping-cart.service';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
    totalItemsInCart: number;

    constructor(private shoppingCartService: ShoppingCartService) { }

    async ngOnInit() {
        const cart$ = await this.shoppingCartService.totalItemsInCart();
        cart$.subscribe(count => this.totalItemsInCart = count);
    }

}
