import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

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
}
