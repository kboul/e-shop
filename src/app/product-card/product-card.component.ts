import { Component, Input } from '@angular/core';
import { Product } from './../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
    @Input() product: Product;
    @Input() isBtnVisible = true;

    constructor(private shoppingCartService: ShoppingCartService) { }

    addToCart(product: Product) {
        const cartId = localStorage.getItem('cartId');
        // store the cartdId in case client leaves and returns to the page
        if (!cartId) {
            this.shoppingCartService.create().then(result => {
                localStorage.setItem('cartId', result.key);
            });
        }
    }
}
