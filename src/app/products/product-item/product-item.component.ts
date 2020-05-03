import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  userRole;
  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private authService: AuthService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.authService.userRole.subscribe((role) => {
      this.userRole = role;
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

  editProduct() {
    this.productService.productSend.next(this.product);
  }

  showProductDetails() {
    this.productService.productDetails.next(this.product);
    this.router.navigate([`/product/${this.product.id}`]);
  }

  onRemoveProduct() {
    this.dataStorageService.deleteProduct(this.product.id);
    this.productService.deleteProduct(this.product.id);
  }
}
