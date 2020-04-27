import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {}

  onAddWishList() {
    this.dataStorageService.addToWishList(this.product.id).subscribe();
  }

  onAddCart() {
    this.dataStorageService.addToCart(this.product.id).subscribe();
  }

  onCheckOut() {
    console.log('checkout');
  }
}
