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

    constructor(private cartService: ShoppingCartService) { }

    addToCart(product: Product) {
        this.cartService.addToCart(product);
    }
}
