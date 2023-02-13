import {IProductType} from './i-product-type';

export interface IProduct {
  productId?: number;
  productName?: string;
  productPrice?: string;
  productStatus?: string;
  productType?: IProductType;
}
