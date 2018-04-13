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
    @Input() shoppingCart;

    constructor(private cartService: ShoppingCartService) { }

    addToCart(product: Product) {
        this.cartService.addToCart(product);
    }

    getQuantity() {
        if (!this.shoppingCart) { return 0; }

        const item = this.shoppingCart.items[this.product.key];
        return item ? item.quantity : 0;
    }
}
