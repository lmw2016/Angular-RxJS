import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EMPTY, catchError, map } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';

import { ProductService } from './product.service';
import { Product } from './product';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories: ProductCategory[] = [];

  constructor(private productService: ProductService) {}

  products$ = this.productService.products$.pipe(
    map(products => products.map((product) => ({
      ...product,
      price: product.price? product.price*1.36:0,
      searchKey:[product.productName]
    } as Product))),
    catchError((error) => {
      this.errorMessage = error;
      return EMPTY;
    })
  );

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
