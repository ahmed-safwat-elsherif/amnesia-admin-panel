import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service'


@Component({
  selector: 'app-admin-user-orders',
  templateUrl: './admin-user-orders.component.html',
  styleUrls: ['./admin-user-orders.component.css']
})
export class AdminUserOrdersComponent implements OnInit {

  constructor(private myService: OrdersService) { }

  /*var*/
  orders
  subscriber
  totalPriceArr: Array<number> = []
  ordersId: Array<number> = []

  isFetching = false

  // showAllOrders
  showAllOrders() {
    // this.subscriber = this.myService.displayOrders().pipe(shareReplay({ bufferSize: 1, refCount: true }))
    console.log(this.isFetching)
    this.isFetching = true
    this.subscriber = this.myService.displayOrders()
      .subscribe((orders) => {
        this.isFetching = false
        console.log(orders);
        // console.log(Object.values(orders)[0][0]._id) //order id
        const ordersArr = Object.values(orders)[0]
        this.orders = ordersArr
        console.log(this.orders) //array of orders
        // console.log(this.orders.length)
        // console.log(this.orders[0].products) //array of products in single order
        // console.log(this.orders[0].products.length)
        // console.log(this.orders[0].products[0].quantity)
        // console.log(this.orders[0].products[0].productId)
        // console.log(this.orders[0].products[0].productId.current_price)


        for (let i = 0; i < this.orders.length; i++) {
          var total = 0;
          var quantity = 0;
          var price = 0;
          this.ordersId.push(Object.values(orders)[0][i]._id)
          for (let j = 0; j < this.orders[i].products.length; j++) {
            quantity = this.orders[i].products[j].quantity;
            price = this.orders[i].products[j].productId.current_price;
            total += quantity * price
          }
          this.totalPriceArr.push(total)
        }
        console.log(this.totalPriceArr)
        console.log(this.ordersId)
      },
        (error) => {
          console.log(error);
        }
      )
  }


  ngOnInit(): void {
    this.showAllOrders()
  }

}