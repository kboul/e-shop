import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { Product } from "./../models/product";
import { map, take } from "rxjs/operators";
import { ShoppingCart } from "../models/shopping-cart";
import { Observable } from "rxjs";

@Injectable()
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    console.log(cartId);
    this.db.object("/shopping-carts/" + cartId + "/items").remove();
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db
      .object("/shopping-carts/" + cartId)
      .snapshotChanges()
      .pipe(
        map((x: { payload: { val } }) => {
          return new ShoppingCart(x.payload.val().items);
        })
      );
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem("cartId");
    // store the cartdId in case client leaves and returns to the page
    if (cartId) return cartId;

    // await with async is used to get async data like synch
    const result = await this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }

  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime(),
    });
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item: AngularFireObject<{}> = this.db.object(
      "/shopping-carts/" + cartId + "/items/" + product.key
    );
    const itemSnap$ = item.snapshotChanges();

    itemSnap$.pipe(take(1)).subscribe((data: any) => {
      const prod = { key: data.payload.key, ...data.payload.val() };
      const quantity = (prod.quantity || 0) + change;
      // remove item if quantity reached 0
      if (quantity === 0) item.remove();
      // else update its values
      else
        item.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity,
        });
    });
  }
}
