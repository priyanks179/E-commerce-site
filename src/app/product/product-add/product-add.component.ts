import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

 
  constructor( private http: HttpClient) { }

  addProductForm: FormGroup;

  ngOnInit(): void {
    this.addProductForm=new FormGroup({
      'title': new FormControl(null),
      'description':new FormControl(null),
      'category':new FormControl(null),
      'price':new FormControl(null),
      'imgUrl':new FormControl(null)
    });

  }
  
  onSubmit(){
    let postData={
    title:this.addProductForm.value.title,
    descp:this.addProductForm.value.description,
    category:this.addProductForm.value.category,
    price:this.addProductForm.value.price,
    imgUrl:this.addProductForm.value.imgUrl

  }

  console.log(postData);


  this.http
  .post<any>('http://localhost:8001/api/products', postData)
  .subscribe((resp)=>{
    console.log(resp);
  })
}
}
