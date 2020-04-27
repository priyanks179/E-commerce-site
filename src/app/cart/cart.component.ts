import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../shared/product.model';
import { AuthService } from '../authentication/auth.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Product[];
  cartLoading: Boolean = false;
  word: string = 'item';
  totalCost: number = 0;
  totalPayableAmount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartLoading = true;
    this.dataStorageService.fetchCart().subscribe();
    this.cartService.cartChanged.subscribe((cart: Product[]) => {
      this.cart = cart;
      this.cartLoading = false;
      this.totalCost = 0;
      if (this.cart.length > 1) {
        this.word = 'items';
      }
      this.cart.map((item) => {
        this.totalCost += +item.price * +item.quantity;
      });
      this.totalPayableAmount = this.totalCost + 50;
    });
  }
}
