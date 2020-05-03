import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product;
  subscription: Subscription;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (this.productService.getProducts().length === 0) {
        this.dataStorageService.fetchProduct(+params.id).subscribe(
          (product) => {
            this.product = product;
          },
          (err) => {
            this.router.navigate(['/']);
          }
        );
      } else {
        this.product = this.productService.getProduct(+params.id);
        if (!this.product) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  onAddWishList() {
    if (this.authService.getUsername()) {
      this.dataStorageService.addToWishList(this.product.id).subscribe();
    } else {
      const btn: HTMLElement = document.querySelector('#login-btn');
      btn.click();
    }
  }

  onAddCart() {
    if (this.authService.getUsername()) {
      this.dataStorageService.addToCart(this.product.id).subscribe();
    } else {
      const btn: HTMLElement = document.querySelector('#login-btn');
      btn.click();
    }
  }

  onCheckOut() {
    if (this.authService.getUsername()) {
      this.dataStorageService.addToCart(this.product.id).subscribe(() => {
        this.router.navigate(['/cart']);
      });
    } else {
      const btn: HTMLElement = document.querySelector('#login-btn');
      btn.click();
    }
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
