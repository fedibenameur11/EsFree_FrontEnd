import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Raba3 } from '../Models/raba3';
import { Jeux } from '../Models/Jeux';

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
  addGameSession(raba3: Raba3): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/addGameSession`, raba3);
  }

  retrieveUserGameSession(name: String): Observable<Raba3[]> {
    return this.httpClient.get<Raba3[]>(`${this.baseUrl}/retrieveUserGameSession/${name}`);
  }

  deleteGameSession(idRaba3: number): Observable<Raba3> {
    return this.httpClient.delete<Raba3>(`${this.baseUrl}/removeGameSession/${idRaba3}`);
  }

  updateGameSession(raba3 : Raba3,): Observable<Raba3>{
    return this.httpClient.put<Raba3>(`${this.baseUrl}/updateGameSession`, raba3);

  }

  addGameSessionAndAssignToGame(raba3: Raba3, idJeux: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/addGameSessionAndAssignToGame/${idJeux}`, raba3);
  }

  retrieveGameSession(idRaba3: number): Observable<Raba3> {
    return this.httpClient.get<Raba3>(`${this.baseUrl}/retrieveGameSession/${idRaba3}`);
  }

  retieveGameSessionSpecificUser(idRaba3: number, name: String): Observable<Raba3> {
    return this.httpClient.get<Raba3>(`${this.baseUrl}/retieveGameSessionSpecificUser/${idRaba3},${name}`);
  }
  

  



}