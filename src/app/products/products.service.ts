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
  productDetails = new Subject<Product>();

  constructor() {}

  setProducts(products: Product[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }

  getProducts() {
    return this.products.slice();
  }

  getProduct(index: number) {
    const products = this.products.filter((product) => product.id === index);
    if (products.length > 0) {
      return products[0];
    }
  }

  filterProducts(type: string, details: string) {
    let filteredProduct;
    if (type === 'title') {
      filteredProduct = this.products.filter(
        (product) =>
          product.title.toLowerCase().indexOf(details.toLowerCase()) > -1
      );
    } else {
      filteredProduct = this.products.filter((product) => {
        return product[type] === details;
      });
    }
    this.productsChanged.next(filteredProduct);
  }

  deleteProduct(id: number) {
    this.products = this.products.filter((product) => product.id !== id);
    this.productsChanged.next(this.products.slice());
  }
}
