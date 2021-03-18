import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.css']
})
export class AdminProductAddComponent implements OnInit {

  status=['normal','Sale','Out of stock']
  isFetching = false
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }
  product: any={
    name:"",
    describtion:"",
    status:"normal",
    current_price:0,
    old_price:0
  }
  imageFileName="";
  ngOnInit(): void {
  }

  /*add*/
  add() {
    this.product;
    this.productService.addProduct(this.product)
      .subscribe(
        (res: any) => {
          console.log(res)
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
