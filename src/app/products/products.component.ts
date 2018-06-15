import { Subscription } from 'rxjs';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../admin/product-form/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
    // initialize arrays to avoid getting undefined in the first place
    products = [];
    filteredProducts = [];
    categories$;
    category: string;
    cart: any;
    subscription: Subscription;

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private activatedRoute: ActivatedRoute,
        private cartService: ShoppingCartService) { }

    async ngOnInit() {
        this.productService.getProducts().subscribe(products =>  {
            // get all the products when first loading the page
            this.filteredProducts = this.products = products;
        });
        this.categories$ = this.categoryService.getCategories();

        // extract the selected category
        this.activatedRoute.queryParamMap.subscribe(params => {
            this.category = params.get('category');

            this.filteredProducts = (this.category) ?
                this.products.filter(p => p.category === this.category) : this.products;
        });

        this.subscription = (await this.cartService.getCart()).valueChanges()
            .subscribe(cart => this.cart = cart);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

