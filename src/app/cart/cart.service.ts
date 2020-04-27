import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../shared/product.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[];
  cartChanged = new Subject<Product[]>();

  constructor() {}

  setCart(cart: Product[]) {
    this.cart = cart;
    this.cartChanged.next(this.cart.slice());
  }

  getCart() {
    return this.cart.slice();
  }

  removeCartItem(id: number) {
    this.cart = this.cart.filter((item) => item.id !== id);
    this.cartChanged.next(this.cart.slice());
  }

  editCartItemQuantity(id: number, operator: string) {
    this.cart.forEach((item) => {
      if (item.id === id) {
        if (operator === 'add') {
          item.quantity = item.quantity + 1;
        } else {
          item.quantity = item.quantity - 1;
        }
      }
    });
    this.cartChanged.next(this.cart.slice());
  }
}
