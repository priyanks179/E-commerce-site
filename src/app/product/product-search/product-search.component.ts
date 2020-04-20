import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  constructor(private http: HttpClient) { }
  
  product: Product[]
  ngOnInit(): void {
    this.http.get<Product[]>("http://localhost:8001/api/products").subscribe(resp=>{
      this.product=resp;
    })
  
  }

  
    
}
