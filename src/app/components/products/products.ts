import { IProduct } from '../../shared/interfaces/iproduct';
import { ProductsAPI } from './../../services/products/products-api';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Productcard } from './productcard/productcard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [Productcard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit, OnDestroy {
  /* Dependency Injection */
  private readonly productsAPI = inject(ProductsAPI);

  /* Properties */
  products: IProduct[] = [];
  private productsSubscription!: Subscription;

  /* Methods */
  getAllProductsData(): void {
    this.productsSubscription = this.productsAPI.getAllProducts().subscribe({
      next: (result) => (this.products = result),
      error: (err) => {
        console.log(`%c${err.message}`, 'color:red');
      },
    });
  }

  /* Component Lifecycle Hooks */
  ngOnInit(): void {
    this.getAllProductsData();
  }
  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
