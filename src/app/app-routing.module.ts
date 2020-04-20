import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './header/signup/signup.component';
import { SigninComponent } from './header/signin/signin.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { ProductDeleteComponent } from './product/product-delete/product-delete.component';
import { ProductSearchComponent } from './product/product-search/product-search.component';


const routes: Routes = [
  { path:'signup', component: SignupComponent},
  { path:'signin', component: SigninComponent},
  { path:'products/add',component: ProductAddComponent},
  { path:'products/update/:pId',component: ProductUpdateComponent},
  { path:'products/delete/:pId',component: ProductDeleteComponent},
  { path:'products/search',component: ProductSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
