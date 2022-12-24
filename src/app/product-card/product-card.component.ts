import { Component, Input } from "@angular/core";
import { Product } from "./../models/product";
import { ShoppingCartService } from "../services/shopping-cart.service";
import { ShoppingCart } from "./../models/shopping-cart";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() isBtnVisible = true;
  @Input() shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
