import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../admin/product-form/product.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products$;
    categories$;

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService) { }

    ngOnInit() {
        this.products$ = this.productService.getProducts();
        this.categories$ = this.categoryService.getCategories();
    }

}
