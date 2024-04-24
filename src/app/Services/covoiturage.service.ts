import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Covoiturage } from '../Models/covoiturage';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CovoiturageService {
  private baseUrl : String ="http://localhost:8082/Covoiturage";
  constructor(private httpClient : HttpClient) { }
  getListCovoiturage(): Observable<Covoiturage[]> 
  {
    return this.httpClient.get<Covoiturage[]>(this.baseUrl +'/retreiveCovoiturages')
      
  }
}
