import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orders: Product[];
  ordersLoading: boolean = false;
  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.ordersLoading = true;
    this.dataStorageService.fetchPastOrders().subscribe((orders) => {
      this.orders = orders;
      this.ordersLoading = false;
    });
  }
}
