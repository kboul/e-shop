import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../admin/product-form/product.service";
import { ShoppingCartService } from "../services/shopping-cart.service";
import { ShoppingCart } from "../models/shopping-cart";
import { Observable } from "rxjs";
import { CategoryService } from "./../services/category.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  // initialize arrays to avoid getting undefined in the first place
  products = [];
  filteredProducts = [];
  categories$;
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      // get all the products when first loading the page
      this.filteredProducts = this.products = products;
    });
    this.categories$ = this.categoryService.getCategories();

    // extract the selected category
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.category = params.get("category");

      this.filteredProducts = this.category
        ? this.products.filter((p) => p.category === this.category)
        : this.products;
    });

    this.cart$ = await this.cartService.getCart();
  }
}
