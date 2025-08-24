import { Subscription } from 'rxjs';
import { IShow } from '../../shared/interfaces/ishow';
import { MoviesAPI } from './../../services/movies/movies-api';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IGenre } from '../../shared/interfaces/igenre';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  /* Dependency Injection */
  private readonly moviesAPI = inject(MoviesAPI);

  /* Properties */
  trendingShows: IShow[] = [{}] as IShow[];
  listOfOfficialGenres: IGenre[] = [{}] as IGenre[];
  trendingShowsSubscription!: Subscription;
  listOfOfficialGenresSubscription!: Subscription;
  imgBase: string = 'https://image.tmdb.org/t/p/w500';
  isLoaded: boolean = false;

  /* Methods */
  getTrendingShowsData(): void {
    this.trendingShowsSubscription = this.moviesAPI
      .getTrendingShows()
      .subscribe({
        next: (result) => {
          this.trendingShows = this.shuffleList<IShow>(result.results);
          console.log(this.trendingShows);
        },
        error: (err) => console.log(`%c ${err.message}`, 'color:red'),
      });
  }
  getListOfOfficialGenresData(): void {
    this.listOfOfficialGenresSubscription = this.moviesAPI
      .getListOfOfficialGenres()
      .subscribe({
        next: (result) => {
          this.listOfOfficialGenres = result.genres;
        },
        error: (err) => console.log(`%c ${err.message}`, 'color:red'),
        complete: () => {
          this.parseGenreNames(this.listOfOfficialGenres, this.trendingShows);
          this.isLoaded = true;
        },
      });
  }

  private shuffleList<T>(list: T[]): T[] {
    let count1: number = 0;
    let count2: number = 0;
    let temp!: T;

    for (count1 = list.length - 1; count1 >= 0; count1--) {
      count2 = Math.floor(Math.random() * (count1 + 1));

      temp = list[count1];
      list[count1] = list[count2];
      list[count2] = temp;
    }

    return list;
  }

  parseGenreNames(gList: IGenre[], trendingShowsList: IShow[]): void {
    let genreNameListElement: string[];
    let genreFreqList: IGenre[] = [];
    gList.forEach((genre) => {
      genreFreqList[genre.id] = genre;
    });
    for (let count1: number = 0; count1 < trendingShowsList.length; count1++) {
      genreNameListElement = [];
      for (
        let count2: number = 0;
        count2 < trendingShowsList[count1].genre_ids.length;
        count2++
      ) {
        if (genreFreqList[trendingShowsList[count1].genre_ids[count2]]?.name) {
          genreNameListElement.push(
            genreFreqList[trendingShowsList[count1].genre_ids[count2]].name
          );
        }
      }
      if (genreNameListElement.length) {
        trendingShowsList[count1].genre_names = genreNameListElement;
        // console.log(trendingShowsList[count1].genre_names);
      }
    }
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
