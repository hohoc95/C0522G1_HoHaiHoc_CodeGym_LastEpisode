import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IProductType} from '../../model/i-product-type';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productFormGroup: FormGroup = new FormGroup({
    productName: new FormControl('', Validators.required),
    productPrice: new FormControl('', Validators.required),
    productStatus: new FormControl('', Validators.required),
    productType: new FormControl('', Validators.required)
  });
  productTypeList: IProductType[];

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.productService.findAllProductType().subscribe(value => {
      this.productTypeList = value;
    });
  }
  submit(): void {
    const product = this.productFormGroup.value;
    this.productService.addProduct(product).subscribe(() => {
      Swal.fire({
        title: 'Thêm mới thành công!',
        text: 'Sản phẩm: ' + product.productName,
        imageUrl: 'https://genk.mediacdn.vn/2018/9/20/a2989534790f069f03671d247dd5222b-15374152422351400600667.gif',
        imageHeight: 250,
        imageWidth: 400
      });
      this.productFormGroup.reset();
    }, error => {
      console.log(error);
    }, () => {
      this.router.navigateByUrl('');
      console.log('Thêm sản phẩm thành công!');
    });
  }

}
