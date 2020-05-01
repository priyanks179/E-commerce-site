import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-order-history-items',
  templateUrl: './order-history-items.component.html',
  styleUrls: ['./order-history-items.component.css'],
})
export class OrderHistoryItemsComponent implements OnInit {
  @Input() item: Product;
  date: string;
  orders: Product[];

  constructor() {}

  ngOnInit(): void {
    this.date = this.item[0];
    this.orders = this.item[1];
  }
}
