import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/shared/product.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product
  constructor(private http:HttpClient,
              private route: ActivatedRoute) { }


  updateProductForm: FormGroup
  ngOnInit(): void {
    const pId= this.route.snapshot.params['pId']

    console.log(pId)

    this.http.get<Product>('http://localhost:8001/api/products/pId/'+pId).subscribe((res)=>{
      this.product=res;
      console.log(this.product.title)

      this.updateProductForm=new FormGroup({
        'title': new FormControl(this.product.title),
        'description':new FormControl(this.product.descp),
        'category':new FormControl(this.product.category),
        'price':new FormControl(this.product.price),
        'imgUrl':new FormControl(this.product.imgUrl)
      });
      })

      this.updateProductForm=new FormGroup({
        'title': new FormControl(),
        'description':new FormControl(),
        'category':new FormControl(),
        'price':new FormControl(),
        'imgUrl':new FormControl()
      });
    }

  

  onSubmit(){
    const pId= this.route.snapshot.params['pId']
    let postData={
    title:this.updateProductForm.value.title,
    descp:this.updateProductForm.value.description,
    category:this.updateProductForm.value.category,
    price:this.updateProductForm.value.price,
    imgUrl:this.updateProductForm.value.imgUrl

  }

  console.log(postData);
  const putUrl=`http://localhost:8001/api/products/pId/${pId}`;

  console.log(putUrl)
  this.http
  .put<any>(putUrl, postData)
  .subscribe((resp)=>{
    console.log(resp);
  })
}


}
