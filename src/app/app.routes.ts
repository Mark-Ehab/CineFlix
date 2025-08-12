import { Routes } from '@angular/router';
import { Home } from './components/home/home';

export const routes: Routes = [
    {path:"", redirectTo:"home", pathMatch:"full"},
    {path:"home", component:Home, title:"Home"},
    {path:"trendify", loadComponent:()=>import("./components/trendify/trendify").then((component)=>component.Trendify), title:"Trendify"},
    {path:"products", loadComponent:()=>import("./components/products/products").then((component)=>component.Products), title:"Products"},
    {path:"**", loadComponent:()=>import("./components/pagenotfound/pagenotfound").then((component)=>component.Pagenotfound), title:"404 - Page Not Found !"}
];
