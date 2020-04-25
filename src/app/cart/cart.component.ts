import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/product.model';
import { AuthService } from '../authentication/auth.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  mySubscription: any;
  userProducts: Product[];
  username: String;
  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];
    this.http
      .get<Product[]>(`http://localhost:8001/users/${this.username}/product`)
      .subscribe((products) => {
        this.userProducts = products;
      });
  }

  removeItem(pId: Number) {
    this.http
      .delete(`http://localhost:8001/users/${this.username}/product/${pId}`)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['users', this.username, 'product']);
            });
        }
      );
  }
}
