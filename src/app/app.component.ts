import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { User } from './user';
import * as _ from 'lodash';
import { Observable, throwError, of  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Sample-Project';
  search = "";
  filterText = "";
  values = '';
  localString = '';
  localItems = {
    items:[{
      login:"",
      avatar_url:"",
      html_url:""
    }]
  };
  favourites : User = {
    items:[{
      login:"",
      avatar_url:"",
      html_url:""
    }],
    total_count:0
  };
  favouritesString = "";
  searchObj: User = {
    items:[{
      login:"",
      avatar_url:"",
      html_url:""
    }],
    total_count:0
  }
  isEnabled = true; 
  apiURL = 'https://api.github.com/search/users';

  constructor(private http:HttpClient){

  }

  ngOnInit(){
    this.getLocalStorage();
  }

  onKey(event:any){
    console.log(event);
    this.values = event;
    this.getUser(this.values).subscribe((data) => {
      this.searchObj = data;
    });
  }

  getLocalStorage(){
    if(localStorage.getItem('favourites')){
      this.favouritesString =  localStorage.getItem('favourites');
      console.log(JSON.parse(this.favouritesString))
      this.favourites.items = JSON.parse(this.favouritesString);
    }
  }

  addFavourite(name,image,link){
    this.isEnabled = true;
    this.getLocalStorage();
    this.localString = this.favouritesString;
    if(this.favourites.items.length < 6){
      for(let i=0;i<this.favourites.items.length;i++){
        if(this.favourites.items[i].login == name){
          window.alert("Bu kullanıcı zaten favorilerinizde ekli")
          this.isEnabled = false; 
        }
      }
      if(this.isEnabled == true){
  
        this.favourites.items.push({
          login:name,
          avatar_url:image,
          html_url:link
        })
        this.localString = JSON.stringify(this.favourites.items);
        localStorage.clear();
        localStorage.setItem('favourites',this.localString);
      }
    } else{
      window.alert("Maksimum 5 kişi favoriye ekleyebilirsiniz.")
    }



  }

  deleteFavourite(name){
    for(let i=0;i<this.favourites.items.length;i++){
      if(this.favourites.items[i].login == name){
        this.favourites.items.splice(i,1);
        this.localString = JSON.stringify(this.favourites.items);
        localStorage.clear();
        localStorage.setItem('favourites',this.localString);
      }
    }
  }


  getUser(value:string): Observable<any> {
    return this.http.get("https://api.github.com/search/users?per_page=100&q=" + value);
  }


  handleError(){
    return throwError("aaa");
  }


  
}
