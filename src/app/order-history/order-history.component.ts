import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Product } from '../shared/product.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orders = [];
  ordersLoading: boolean = false;
  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.ordersLoading = true;
    this.dataStorageService
      .fetchPastOrders()
      .pipe(
        map((orders) => {
          const orderList = {};
          orders.forEach((order) => {
            if (!orderList.hasOwnProperty(order.localDate)) {
              orderList[order.localDate] = [];
            }
            const item = {
              ...order,
            };
            delete item.localDate;
            orderList[order.localDate].push(item);
          });
          return Object.entries(orderList);
        })
      )
      .subscribe((orders) => {
        this.orders = orders;
        this.ordersLoading = false;
      });
  }
}
