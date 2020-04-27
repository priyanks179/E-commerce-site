import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../products/products.service';
import { tap, map } from 'rxjs/operators';
import { Product } from './product.model';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private productService: ProductsService,
    private authService: AuthService
  ) {}

  fetchProducts() {
    return this.http.get<Product[]>('products').pipe(
      map((products) => {
        return products.map((product) => {
          const id = product.pId;
          delete product.pId;
          return {
            ...product,
            id,
          };
        });
      }),
      tap((products) => {
        this.productService.setProducts(products);
      })
    );
  }

  addToCart(id: number) {
    return this.http.post(
      `users/${this.authService.getUsername()}/cart/${id}`,
      null
    );
  }

  addToWishList(id: number) {
    return this.http.post(
      `users/${this.authService.getUsername()}/wishlist/${id}`,
      null
    );
  }
}
