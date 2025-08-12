import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IShow } from '../../shared/interfaces/ishow';
import { IGenre } from '../../shared/interfaces/igenre';
import { Subscription } from 'rxjs';
import { MoviesAPI } from '../../services/movies/movies-api';
import { Moviecard } from "../../shared/components/moviecard/moviecard";

@Component({
  selector: 'app-recommendedmovies',
  imports: [Moviecard],
  templateUrl: './recommendedmovies.html',
  styleUrl: './recommendedmovies.css'
})
export class Recommendedmovies implements OnInit, OnDestroy {
  /* Dependeny Injection */
  private readonly moviesAPI = inject(MoviesAPI);

  /* Properties */
  imgBase:string="https://image.tmdb.org/t/p/w500";
  trendingShows:IShow[] = [] as IShow[];
  genreList:IGenre[] = [] as IGenre[];
  private trendingShowsSubscription!:Subscription;
  private allGeneresSubscription!:Subscription;

  /* Methods */
getTrendingShowsData():void{
  this.trendingShowsSubscription = this.moviesAPI.getTrendingShows().subscribe(
    {
      next:(result)=>{
        this.trendingShows = result.results;
        console.log(result.results)},
      error:(err)=>{console.log(`%c ${err.message}`,"color:red")}
    })
}
getListOfOfficialGenresData():void{
  this.allGeneresSubscription = this.moviesAPI.getListOfOfficialGenres().subscribe(
    {
      next:(result)=>{
        this.genreList = result.genres;
        console.log(result.genres)},
      error:(err)=>{console.log(`%c ${err.message}`,"color:red")}
    })
}

  /* Component Lifecycle Hooks */
 ngOnInit(): void {
   this.getTrendingShowsData();
   this.getListOfOfficialGenresData();
 }

ngOnDestroy(): void {
  this.trendingShowsSubscription.unsubscribe();
  this.allGeneresSubscription.unsubscribe();
}
}
