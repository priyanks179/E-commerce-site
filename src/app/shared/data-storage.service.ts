import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../products/products.service';
import { tap, map } from 'rxjs/operators';
import { Product } from './product.model';
import { AuthService } from '../authentication/auth.service';
import { Subject } from 'rxjs';
import { CartService } from '../cart/cart.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  cartCount: Subject<number> = new Subject<number>();
  wishCount: Subject<number> = new Subject<number>();

  constructor(
    private http: HttpClient,
    private productService: ProductsService,
    private cartService: CartService,
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

  fetchCart() {
    return this.http
      .get<Product[]>(`users/${this.authService.getUsername()}/cart`)
      .pipe(
        map((cart) => {
          return cart.map((item) => {
            const id = item.cId;
            delete item.cId;
            return {
              ...item,
              id,
            };
          });
        }),
        tap((cart) => {
          this.cartService.setCart(cart);
        })
      );
  }

  fetchCartCount() {
    this.http
      .get(`users/${this.authService.getUsername()}/cart/count`)
      .subscribe((count) => {
        this.cartCount.next(+count);
      });
  }

  addToCart(id: number) {
    return this.http
      .post(`users/${this.authService.getUsername()}/cart/${id}`, null)
      .pipe(
        tap(() => {
          this.fetchCartCount();
        })
      );
  }

  editItemQty(id: number, operator: string) {
    let postbody = {};
    postbody[operator] = 1;
    this.http
      .post(`users/${this.authService.getUsername()}/cart/${id}/edit`, postbody)
      .subscribe();
  }

  deleteFromCart(id: number) {
    return this.http
      .delete(`users/${this.authService.getUsername()}/cart/${id}`)
      .pipe(
        tap(() => {
          this.fetchCartCount();
        })
      );
  }

  fetchWishList() {
    return this.http
      .get<Product[]>(`users/${this.authService.getUsername()}/wishlist`)
      .pipe(
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

  fetchWishListCount() {
    this.http
      .get(`users/${this.authService.getUsername()}/wishlist/count`)
      .subscribe((count) => {
        this.wishCount.next(+count);
      });
  }

  addToWishList(id: number) {
    return this.http
      .post(`users/${this.authService.getUsername()}/wishlist/${id}`, null)
      .pipe(
        tap(() => {
          this.fetchWishListCount();
        })
      );
  }

  deleteFromWishList(id: number) {
    return this.http
      .delete(`users/${this.authService.getUsername()}/wishlist/${id}`)
      .pipe(
        tap(() => {
          this.fetchWishListCount();
        })
      );
  }
}
