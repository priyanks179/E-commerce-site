import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}

  filterProducts(category: string) {
    this.productsService.filterProducts('category', category);
  }

  getProducts() {
    this.productsService.productsChanged.next(
      this.productsService.getProducts()
    );
  }
}
