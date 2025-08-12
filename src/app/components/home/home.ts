import { Subscription } from 'rxjs';
import { IShow } from '../../shared/interfaces/ishow';
import { MoviesAPI } from './../../services/movies/movies-api';
import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IGenre } from '../../shared/interfaces/igenre';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy{
/* Dependency Injection */
private readonly moviesAPI = inject(MoviesAPI);

/* Properties */
trendingShows:IShow[] = [
  {release_date: "",
  first_air_date: ""} as IShow] ;
listOfOfficialGenres:IGenre[] = [{} as IGenre] ;
trendingShowsSubscription!:Subscription;
listOfOfficialGenresSubscription!:Subscription;
imgBase:string="https://image.tmdb.org/t/p/w500";
genreNameList:string[]=[];


/* Methods */
getTrendingShowsData():void
{
  this.trendingShowsSubscription = this.moviesAPI.getTrendingShows().subscribe(
    {
      next:(result)=> this.trendingShows = this.shuffleList<IShow>(result.results),
      error:(err)=>console.log(`%c ${err.message}`,"color:red"),
    }
  )
}
getListOfOfficialGenresData():void
{
  this.listOfOfficialGenresSubscription = this.moviesAPI.getListOfOfficialGenres().subscribe(
    {
      next:(result)=>
        {
          this.listOfOfficialGenres = result.genres; 
          this.genreNameList = this.parseGenreNames(this.listOfOfficialGenres,this.trendingShows[0].genre_ids);
        },
      error:(err)=>console.log(`%c ${err.message}`,"color:red"),
    }
  )
}

private shuffleList <T> (list:T[]):T[]
{
  let count1:number = 0;
  let count2:number = 0;
  let temp!:T ;

  for(count1 = list.length-1 ; count1 >= 0 ; count1--)
  {
    count2 = (Math.floor((Math.random())*(count1+1)));

    temp = list[count1];
    list[count1] = list[count2];
    list[count2] = temp;
  }

  return list;
}

parseGenreNames(gList:IGenre[],gIdList:number[]):string[]{
  let result:string[]=[];
  for(let count1:number = 0; count1 < gIdList.length ; count1++)
  {
    for(let count2:number = 0; count2 < gList.length ; count2++)
    { 
      if(gIdList[count1] === gList[count2].id)
        {
          result.push(gList[count2].name);
        }
    }  
  }
  return result;
}

/* Component Lifecycle Hooks */
ngOnInit(): void {
  this.getTrendingShowsData();
  this.getListOfOfficialGenresData();
}
ngOnDestroy(): void {
  this.trendingShowsSubscription.unsubscribe();
  this.listOfOfficialGenresSubscription.unsubscribe();
}
}
