import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../Interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _apiKey : string ='IGAXC5guUft8IHy7oAM2Nveckq6wU3la';
  private _historial: string[]=[];
  public resultados : Gif[]=[];
  get historial(){
    return [...this._historial];
  }
  constructor(private http:HttpClient){}
  buscarGifs(query:string){
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query) ) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }
      this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q=${query}&limit=10`)
      .subscribe( resp =>{
        console.log(resp.data);
        this.resultados=resp.data;
      });
  }
}
