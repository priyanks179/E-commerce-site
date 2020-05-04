import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { WishlistService } from '../wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.css'],
})
export class WishlistItemComponent implements OnInit {
  @Input() item: Product;
  addingToCart = false;

  constructor(
    private dataStorageService: DataStorageService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRemoveItem() {
    this.dataStorageService.deleteFromWishList(this.item.id).subscribe();
    this.wishlistService.removewishlistItem(this.item.id);
  }

  addItemToCart() {
    this.addingToCart = true;
    this.dataStorageService.addToCart(this.item.pId).subscribe(() => {
      this.addingToCart = false;
      this.onRemoveItem();
      this.router.navigate(['/cart']);
    });
  }
}
