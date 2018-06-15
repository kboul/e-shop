
import {take} from 'rxjs/operators';
import { Component } from '@angular/core';
import { CategoryService } from './../../services/category.service';
import { ProductService } from './product.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
    categories$;
    product = {}; // avoid getting null by setting to {}
    id;

    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
        this.categories$ = categoryService.getCategories();

        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.id) {
            this.productService.getProduct(this.id).valueChanges().pipe(take(1)).subscribe(p => this.product = p);
        }
    }

    save(product) {
        if (this.id) {
            this.productService.update(this.id, product);
        } else {
            this.productService.createProduct(product);
        }
        this.router.navigate(['/admin/products']);
    }

    delete() {
        if (confirm('Are you sure you want to delete this product?')) {
            this.productService.delete(this.id);
            this.router.navigate(['/admin/products']);
        }
    }
}
