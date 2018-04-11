import { Component, OnInit } from '@angular/core';
import { ProductService } from '../admin/product-form/product.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products$;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.products$ = this.productService.getProducts();
    }

}
