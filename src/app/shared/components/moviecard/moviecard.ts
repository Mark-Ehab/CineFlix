import { Component, Input } from '@angular/core';
import { IGenre } from '../../interfaces/igenre';
import { count } from 'rxjs';

@Component({
  selector: 'moviecard',
  imports: [],
  templateUrl: './moviecard.html',
  styleUrl: './moviecard.css'
})
export class Moviecard {
/* Properties */
@Input({required:true}) title!:string;
@Input({required:true}) releaseYear!:string;
@Input({required:true}) genreIdList!:number[];
@Input({required:true}) genreList!:IGenre[];
@Input({required:true}) rate!:number;
@Input({required:true}) posterSrc!:string;

/* Methods */
truncateRate(rateVal:number):string{
  return (Math.trunc(rateVal*10)/10).toFixed(1);
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
}
