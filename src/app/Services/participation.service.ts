import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participation } from '../Models/participation/participation.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  private baseUrl : String ="http://localhost:8082/Participation";
  constructor(private httpClient : HttpClient) {}

  addParticipation(participation: Participation, idEvent:number, userName: string): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/addParticipation/${idEvent}/${userName}`,participation);
  }
  getParticipationsByUser(userName: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/getParticipationsUser/${userName}`);
  }
}
