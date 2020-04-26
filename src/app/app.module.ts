import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './authentication/auth-interceptor.service';
import { CartComponent } from './cart/cart.component';
import { APIInterceptor } from './api-interceptor.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ProductsComponent } from './products/products.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { HomeComponent } from './home/home.component';
import { BtnLoaderComponent } from './shared/btn-loader/btn-loader.component';
import { StarRatingComponent } from './products/product-item/star-rating/star-rating.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { CategoryComponent } from './products/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    AuthenticationComponent,
    ProductsComponent,
    ProductItemComponent,
    ProductFormComponent,
    HomeComponent,
    BtnLoaderComponent,
    StarRatingComponent,
    LoadingSpinnerComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
