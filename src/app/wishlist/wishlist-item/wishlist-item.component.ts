import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.css'],
})
export class WishlistItemComponent implements OnInit {
  @Input() item: Product;

  constructor(
    private dataStorageService: DataStorageService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {}

  onRemoveItem() {
    this.dataStorageService.deleteFromWishList(this.item.id).subscribe();
    this.wishlistService.removewishlistItem(this.item.id);
  }

  addItemToCart() {
    this.dataStorageService.addToCart(this.item.pId).subscribe();
    this.onRemoveItem();
  }
}
