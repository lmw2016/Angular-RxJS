import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EMPTY, map, catchError } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  errorMessage = '';
  selectedProductId = 0;

  constructor(private productService: ProductService) {}

  products$ = this.productService.products$.pipe(
    map((products) =>
      products.map(
        (product) =>
          ({
            ...product,
            price: product.price ? product.price * 1.36 : 0,
            searchKey: [product.productName],
          } as Product)
      )
    ),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  onSelected(productId: number): void {
    console.log('Not yet implemented');
  }
}
