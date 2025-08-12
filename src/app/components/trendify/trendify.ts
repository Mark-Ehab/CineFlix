import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MoviesAPI } from '../../services/movies/movies-api';
import { Subscription } from 'rxjs';
import { IShow } from '../../shared/interfaces/ishow';
import { Moviecard } from "../../shared/components/moviecard/moviecard";
import { IGenre } from '../../shared/interfaces/igenre';
import { Recommendedmovies } from "../recommendedmovies/recommendedmovies";

@Component({
  selector: 'app-trendify',
  imports: [Moviecard, Recommendedmovies],
  templateUrl: './trendify.html',
  styleUrl: './trendify.css'
})
export class Trendify implements OnInit, OnDestroy{
  /* Dependeny Injection */
  private readonly moviesAPI = inject(MoviesAPI);

  /* Properties */
  imgBase:string="https://image.tmdb.org/t/p/w500";
  trendingShows:IShow[] = [] ;
  genreList:IGenre[] = [] ;
  private trendingShowsSubscription!:Subscription;
  private allGeneresSubscription!:Subscription;

  /* Methods */
getTrendingShowsData():void{
  this.trendingShowsSubscription = this.moviesAPI.getTrendingShows().subscribe(
    {
      next:(result)=>{this.trendingShows = result.results;},
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
