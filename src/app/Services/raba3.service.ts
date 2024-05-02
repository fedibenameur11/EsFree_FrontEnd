import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Raba3 } from '../Models/raba3';

@Injectable({
  providedIn: 'root'
})
export class Raba3Service {
  private baseUrl:string= "http://localhost:8082/SessionJeux";

  constructor(private httpClient : HttpClient) { }

  getListSessions2(): Observable<Raba3[]> 
  {
    return this.httpClient.get<Raba3[]>(this.baseUrl +'/retrieveAllGameSessions2')
      
  }
  getListSessions(idJeux: number): Observable<Raba3[]> {
    return this.httpClient.get<Raba3[]>(`${this.baseUrl}/retrieveAllGameSessions/${idJeux}`);
  }
}