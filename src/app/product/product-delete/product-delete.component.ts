import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  constructor(private http:HttpClient,
              private route: ActivatedRoute) { }


  
  ngOnInit(): void {
    const pId= this.route.snapshot.params['pId']
    const delUrl=`http://localhost:8001/api/products/${pId}`;
    this.http
        .delete(delUrl).subscribe((resp)=>{
        console.log(resp);
  })
  }
}

