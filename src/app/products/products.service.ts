import { Injectable } from '@angular/core';
import { Product } from '../shared/product.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: Product[] = [];
  productsChanged = new Subject<Product[]>();
  productSend = new Subject<Product>();

  constructor() {}

  setProducts(products: Product[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }

  getProducts() {
    return this.products.slice();
  }

  getProduct(index: number) {
    return this.products[index];
  }

  deleteProduct(id: number) {
    this.products = this.products.filter((product, index) => index !== id);
    this.productsChanged.next(this.products.slice());
  }
}
