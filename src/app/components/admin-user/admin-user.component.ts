import { UsersService } from './../../services/users.service';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  /*var*/
  noOfPages: number;
  arrnoOfPages: number[] = [];
  allData: any[] = [];
  obj: any[] = [];
  loading: boolean = true;
  appear: boolean = false;
  skipGlobal
  limitGlobal
  isFetching=false;
  noOfProducts = 0

  /*ctor*/
  constructor(private userService: UsersService) {
    this.getData(0,5)
   }

  getData(skip, limit) {
    this.loading = true;
    this.appear = false;
    this.skipGlobal = skip;
    this.isFetching=true;
    this.userService.getAllUsers(limit, skip).subscribe(
      (res: any) => {
        console.log(res)
        this.loading = false;
        this.appear = true;
        this.allData = res.users;
        console.log(this.allData)
        this.obj = res.users;
        this.arrnoOfPages = [];
        this.noOfProducts = res.length
        this.noOfPages = Math.ceil(res.length / 5);
        for (let i = 1; i <= this.noOfPages; i++) {
          this.arrnoOfPages.push(i);
        }
        console.log(this.arrnoOfPages)
        this.isFetching=false;
      },
      (error) => {
        this.isFetching=false;
        this.loading = false;
        console.log(error)
      }
    )
  }


  paginate(val) {
    this.getData((((val * 5) - 5)), (val * 5));
    this.skipGlobal = (val * 5) - 5;
  }


  ngOnInit(): void {
    this.paginate(1);
  }

}
