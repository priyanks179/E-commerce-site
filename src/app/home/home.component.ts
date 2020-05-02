import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchBar = '';

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}

  searchProducts() {
    this.productsService.filterProducts('title', this.searchBar);
  }
}
