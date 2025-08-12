import { Component, Input } from '@angular/core';

@Component({
  selector: 'productcard',
  imports: [],
  templateUrl: './productcard.html',
  styleUrl: './productcard.css'
})
export class Productcard {
@Input({required:true}) title!:string;
@Input({required:true}) price!:number;
@Input({required:true}) description!:string;
@Input({required:true}) category!:string;
@Input({required:true}) imgSrc!:string;
@Input({required:true}) rate!:number;
@Input({required:true}) count!:number;
}
