import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../products.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Product } from 'src/app/shared/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  product: Product;
  subscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.productService.productSend.subscribe((product) => {
      if (product) {
        this.product = product;
        this.form.setValue({
          title: product.title,
          description: product.descp,
          price: product.price,
          stock: product.quantity,
          category: product.category,
          image: product.imgUrl,
        });
      } else {
        this.product = null;
        this.form.resetForm({
          category: 'Electronics',
        });
      }
    });
  }

  onSubmit() {
    const value = this.form.value;
    console.log(value);
    const product: Product = {
      title: value.title,
      price: value.price,
      quantity: value.stock,
      imgUrl: value.image,
      descp: value.description,
      category: value.category,
    };
    if (!this.product) {
      this.dataStorageService.addProduct(product);
    } else {
      this.dataStorageService.editProduct(product, this.product.id);
    }
    this.closeBtn.nativeElement.click();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
