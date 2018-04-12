import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../admin/product-form/product.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    // initialize arrays to avoid getting undefined in the first place
    products: Product[] = [];
    filteredProducts: Product[] = [];
    categories$;
    category: string;

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private actibatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.productService.getProducts().subscribe(products =>  {
            // get all the products when first loading the page
            this.filteredProducts = this.products = products;
        });
        this.categories$ = this.categoryService.getCategories();

        // extract the selected category
        this.actibatedRoute.queryParamMap.subscribe(params => {
            this.category = params.get('category');

            this.filteredProducts = (this.category) ?
                this.products.filter(p => p.category === this.category) : this.products;
        });
    }

}
