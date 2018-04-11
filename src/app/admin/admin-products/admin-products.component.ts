import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../product-form/product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
    products: {title: string}[];
    filteredProducts: any[];
    subscription: Subscription;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.subscription = this.productService.getProducts()
            .subscribe(products => this.filteredProducts = this.products = products);
    }

    filter(query: string) {
        this.filteredProducts = (query) ?
            this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
            this.products;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
