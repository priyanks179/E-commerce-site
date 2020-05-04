import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartCount: number;
  wishCount: number;
  isLoggedIn = false;
  userSub: Subscription;
  cartCountSub: Subscription;
  wishCountSub: Subscription;
  username: String;
  cartUrl: String = null;
  scrollTopBtn: boolean = false;
  userRole: string;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.authService.userRole.subscribe((role) => {
      this.userRole = role;
    });
    this.userSub = this.authService.loggedIn.subscribe((data) => {
      this.isLoggedIn = data;
    });
    if (this.isLoggedIn) {
      this.cartCountSub = this.dataStorageService.cartCount.subscribe(
        (count) => {
          this.cartCount = count;
        }
      );
      this.wishCountSub = this.dataStorageService.wishCount.subscribe(
        (count) => {
          this.wishCount = count;
        }
      );
    }
  }

  @HostListener('window:scroll')
  scrollControl() {
    if (window.scrollY > 500) {
      this.scrollTopBtn = true;
    } else {
      this.scrollTopBtn = false;
    }
  }

  callForm() {
    this.authService.formCalled.next(true);
  }

  scrollToElement() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  productFormReset() {
    this.productService.productSend.next(null);
  }

  ngOnDestroy() {
    this.authService.loggedIn.unsubscribe();
    this.cartCountSub.unsubscribe();
    this.wishCountSub.unsubscribe();
  }

  onLogOut() {
    this.authService.logout();
    this.dataStorageService.wishCount.next(null);
    this.dataStorageService.cartCount.next(null);
  }
}
