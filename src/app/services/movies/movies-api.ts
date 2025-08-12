import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesAPI {
  /* Dependeny Injection */
  private readonly httpClient = inject(HttpClient);

  /* Properties */
  private baseURL:string = "https://api.themoviedb.org/3";
  private apiKey:string = "48d62e7452a1f1a5e6018217ac27c50a";
  private language:string = "en-US";

  /* Methods */
  getTrendingShows():Observable<any>{
    return this.httpClient.get(`${this.baseURL}/trending/all/day?api_key=${this.apiKey}&language=${this.language}`)
  }
  getListOfOfficialGenres():Observable<any>{
    return this.httpClient.get(`${this.baseURL}/genre/movie/list?api_key=${this.apiKey}&language=${this.language}`)
  }
}
