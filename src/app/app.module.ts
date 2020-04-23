import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './header/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './header/signin/signin.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductDeleteComponent } from './product/product-delete/product-delete.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { ProductSearchComponent } from './product/product-search/product-search.component';
import { AuthInterceptorService } from './header/auth-interceptor.service';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    ProductComponent,
    ProductAddComponent,
    ProductDeleteComponent,
    ProductUpdateComponent,
    ProductSearchComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
       useClass: AuthInterceptorService,
       multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
