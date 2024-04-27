import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jeux } from '../Models/Jeux';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl:string= "http://localhost:8082/Jeux";

  constructor(private httpClient : HttpClient) { }
  getListGames(): Observable<Jeux[]> 
  {
    return this.httpClient.get<Jeux[]>(this.baseUrl +'/retrieveAllGames')
      
  }
}
