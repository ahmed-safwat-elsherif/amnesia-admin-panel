import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product-edit',
  templateUrl: './admin-product-edit.component.html',
  styleUrls: ['./admin-product-edit.component.css']
})
export class AdminProductEditComponent implements OnInit {

  status = ['normal', 'Sale', 'Out of stock']
  _id = this.route.snapshot.paramMap.get('id') || "";
  isFetching = false
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }
  product: any = {
    name: "",
    describtion: "",
    status: "",
    current_price: 0,
    old_price: 0
  }
  ngOnInit(): void {
    this.isFetching = true;
    this._id = this.route.snapshot.paramMap.get('id') || "";
    console.log(this._id)
    this.productService.getProductInfo(this._id).subscribe(
      (res: any) => {
        console.log(res)
        this.isFetching = false;
        this.product = res.product;
    
      },
      err => {
        console.log(err);
        this.isFetching = false;
        this.router.navigate(['dashboard/products'])
      }
    );
  }

  /*save*/
  save() {
    let { name, current_price, old_price, description, status } = this.product;
    console.log(name, current_price, old_price, description)
    this.productService.editProduct(this._id, { name, current_price, old_price, description, status })
      .subscribe(
        (res: any) => {
          console.log(res)
          console.log(this.product)
          this.router.navigate(['dashboard/products'])
        },
        err => {
          console.log(err)
          this.router.navigate(['dashboard/products'])
        }
      )
  }
  /*cancel*/
  cancel() {
    this.router.navigate(['dashboard/products'])
  }

}
