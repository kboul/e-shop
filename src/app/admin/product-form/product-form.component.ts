import { Component } from '@angular/core';
import { CategoryService } from './../../services/category.service';
import { ProductService } from './product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
    categories$;
    product = {}; // avoid getting null by setting to {}

    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
        this.categories$ = categoryService.getCategories();

        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.productService.getProduct(id).valueChanges().take(1).subscribe(p => this.product = p);
        }
    }

    save(product) {
        this.productService.createProduct(product);
        this.router.navigate(['/admin/products']);
    }
}
