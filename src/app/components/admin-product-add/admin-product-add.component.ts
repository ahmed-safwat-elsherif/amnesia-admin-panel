import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
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
    private productService: ProductService,
    private imageService: ImageService
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
  selectedFile: ImageSnippet;
  processFile(imageInput: any,id) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.imageService.uploadImage(id, this.selectedFile.file).subscribe(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        })
    });

    reader.readAsDataURL(file);
  }
  /*add*/
  add(imageInput) {
    this.product;
    this.productService.addProduct(this.product)
      .subscribe(
        (res: any) => {
          console.log(res)
          let id = res.newProduct?._id
          this.processFile(imageInput,id)
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
class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
