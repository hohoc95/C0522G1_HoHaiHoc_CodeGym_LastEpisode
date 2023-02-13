import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataResult} from '../model/data-result';
import {IProductDto} from '../model/i-product-dto';
import {IProductType} from '../model/i-product-type';
import {IProduct} from '../model/i-product';

// const API_URL = `${environment.url}`;
const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  findAllProductPaging(curPage: number, numberRecord: number, nameSearch: string,
                       typeSearch: string): Observable<DataResult<IProductDto>> {
    return this.httpClient.get<DataResult<IProductDto>>(API_URL + '/product/list/' + nameSearch + '&' + typeSearch
      + '?page=' + (curPage - 1) + '&size=' + numberRecord);
  }

  findAllProductType(): Observable<IProductType[]> {
    return this.httpClient.get<IProductType[]>(API_URL + '/product/type-list');
  }

  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(API_URL + '/product/delete-product/' + id);
  }

  addProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient.post<IProduct>(API_URL + '/product/create', product);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient.patch<IProduct>(API_URL + '/product/edit/' + product.productId, product);
  }
}
