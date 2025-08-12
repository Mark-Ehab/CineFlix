import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsAPI {
  /* Dependency Injection */
  private readonly httpClient = inject(HttpClient);
  
  /* Properties */
  private readonly basURL:string = "https://fakestoreapi.com";

  /* Methods */
  getAllProducts():Observable<any>{
    return this.httpClient.get(`${this.basURL}/products`)
  }
}
