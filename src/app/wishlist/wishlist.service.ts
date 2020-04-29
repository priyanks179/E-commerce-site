import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../shared/product.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlist: Product[];
  wishlistChanged = new Subject<Product[]>();

  constructor() {}

  setwishlist(wishlist: Product[]) {
    this.wishlist = wishlist;
    this.wishlistChanged.next(this.wishlist.slice());
  }

  getwishlist() {
    return this.wishlist.slice();
  }

  removewishlistItem(id: number) {
    this.wishlist = this.wishlist.filter((item) => item.id !== id);
    this.wishlistChanged.next(this.wishlist.slice());
  }

  editwishlistItemQuantity(id: number, operator: string) {
    this.wishlist.forEach((item) => {
      if (item.id === id) {
        if (operator === 'add') {
          item.quantity = item.quantity + 1;
        } else {
          item.quantity = item.quantity - 1;
        }
      }
    });
    this.wishlistChanged.next(this.wishlist.slice());
  }
}
