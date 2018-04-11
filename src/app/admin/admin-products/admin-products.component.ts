import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from './../product-form/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from './product';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, AfterViewInit, OnDestroy {
    filteredProducts: any[];
    subscription: Subscription;
    displayedColumns = ['title', 'price', '$key'];
    dataSource = new MatTableDataSource<Product>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.subscription = this.productService.getProducts().subscribe(products => {
            this.dataSource.data = products;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
