import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { WishlistService } from './wishlist.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlist: Product[];
  wishlistLoading: boolean = false;

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.wishlistLoading = true;
    this.dataStorageService.fetchWishList().subscribe();
    this.wishlistService.wishlistChanged.subscribe((wishlist: Product[]) => {
      if (wishlist.length === 0) {
        this.router.navigate(['/']);
      }
      this.wishlist = wishlist;
      this.wishlistLoading = false;
    });
  }
}
