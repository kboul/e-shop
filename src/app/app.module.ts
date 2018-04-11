import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from './../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ProductFormComponent } from './admin/product-form/product-form.component';

import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ProductService } from './admin/product-form/product.service';
import { CategoryService } from './services/category.service';

import { CustomFormsModule } from 'ng2-validation';

@NgModule({
    declarations: [
        AppComponent,
        BsNavbarComponent,
        HomeComponent,
        ProductsComponent,
        ShoppingCartComponent,
        CheckOutComponent,
        OrderSuccessComponent,
        MyOrdersComponent,
        AdminProductsComponent,
        AdminOrdersComponent,
        LoginComponent,
        ProductFormComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CustomFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        NgbModule.forRoot(),
        RouterModule.forRoot([
            { path: 'login' , component: LoginComponent },
            { path: '', component: HomeComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'shopping-cart', component: ShoppingCartComponent },
            { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
            { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
            { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },
            {
                path: 'admin/products/new',
                component: ProductFormComponent,
                canActivate: [AuthGuardService, AdminAuthGuardService]
            },
            {
                path: 'admin/products/:id',
                component: ProductFormComponent,
                canActivate: [AuthGuardService, AdminAuthGuardService]
            },
            {
                path: 'admin/products',
                component: AdminProductsComponent,
                canActivate: [AuthGuardService, AdminAuthGuardService]
            },
            {
                path: 'admin/orders',
                component: AdminOrdersComponent,
                canActivate: [AuthGuardService, AdminAuthGuardService]
            }
        ])
    ],
    providers: [
        AuthService,
        AuthGuardService,
        UserService,
        AdminAuthGuardService,
        CategoryService,
        ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
