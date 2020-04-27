import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() item: Product;
  constructor(
    private cartService: CartService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {}

  onRemoveItem() {
    this.dataStorageService.deleteFromCart(this.item.id).subscribe();
    this.cartService.removeCartItem(this.item.id);
  }

  onEditItemQty(operator: string) {
    this.dataStorageService.editItemQty(this.item.pId, operator);
    this.cartService.editCartItemQuantity(this.item.id, operator);
  }
}
