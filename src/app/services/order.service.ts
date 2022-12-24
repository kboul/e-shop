import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { ShoppingCartService } from "./shopping-cart.service";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  placeOrder(order) {
    const result = this.db.list("/orders").push(order);
    console.log("Successful Order");
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list("/orders/").valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db
      .list("/orders", (ref) => ref.orderByChild("userId").equalTo(userId))
      .valueChanges();
  }
}
