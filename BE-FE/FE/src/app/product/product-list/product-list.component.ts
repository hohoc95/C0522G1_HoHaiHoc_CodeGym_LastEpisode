import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IProductDto} from '../../model/i-product-dto';
import {ProductService} from '../../service/product.service';
import {IProductType} from '../../model/i-product-type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  nameSearch = '';
  typeSearch = '';
  page = 1;
  pageSize = 5;
  total$: Observable<number>;
  products$: Observable<IProductDto[]>;
  productTypes$: Observable<IProductType[]>;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getAllProductType();
    this.getAllProductPaging();
  }

  getAllProductPaging(): void {
    this.productService.findAllProductPaging(this.page, this.pageSize, this.nameSearch, this.typeSearch).subscribe(value => {
        this.products$ = new BehaviorSubject<IProductDto[]>(value.content);
        this.total$ = new BehaviorSubject<number>(value.totalElements);
        console.log(this.products$);
      },
      error => {
        console.log(error);
      });
  }

  getAllProductType(): void {
    this.productService.findAllProductType().subscribe(value => {
        this.productTypes$ = new BehaviorSubject<IProductType[]>(value);
      },
      error => {
        console.log(error);
      });
  }

  compareWithId(item1, item2): boolean {
    return item1 && item2 && item1.id === item2.id;
  }

  searchByMore(): void {
    this.page = 1;
    this.getAllProductPaging();
  }
  resetSearchInput(): void {
    this.nameSearch = '';
    this.typeSearch = '';
  }


  deleteProduct(id: number, name: string): void {
    Swal.fire({
      title: 'Bạn có muốn xóa?',
      text: 'Sản phẩm: ' + name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, tôi muốn xóa!',
      cancelButtonText: 'Đóng'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa thành công!',
            text: 'Sản phẩm: ' + name,
            showConfirmButton: false,
            timer: 2000
          });

          this.getAllProductPaging();
        }, error => {
          console.log(error);
        });
      }
    });
  }
}
