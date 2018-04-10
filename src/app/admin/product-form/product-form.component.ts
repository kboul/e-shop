import { Component } from '@angular/core';
import { CategoryService } from './../../services/category.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
    categories$;

    constructor(
        private categoryService: CategoryService,
        private productService: ProductService) {
        this.categories$ = categoryService.getCategories();
    }

    save(product) {
        this.productService.create(product);
    }
}
