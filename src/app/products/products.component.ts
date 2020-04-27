import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Product } from '../shared/product.model';
import { ProductsService } from './products.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  scrollTopBtn = false;

  constructor(
    private productService: ProductsService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.dataStorageService.fetchProducts().subscribe();
    this.subscription = this.productService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }

  @HostListener('window:scroll')
  scrollControl() {
    if (window.scrollY > 500 && screen.width > 576) {
      this.scrollTopBtn = true;
    } else {
      this.scrollTopBtn = false;
    }
  }

  scrollToElement() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  onScroll() {
    return document.body.scrollTop > 50;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
