import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Covoiturage } from '../Models/covoiturage';

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
  addCovoiturage(covoiturage: Covoiturage ): Observable<Covoiturage> {
    const url = `${this.baseUrl}/AddCovoiturage`;
    return this.httpClient.post<Covoiturage>(url, covoiturage);
  }
  deleteCovoiturage(id_cov: any): Observable<any> {
    const url = `${this.baseUrl}/removeCovoiturage/${id_cov}`;
    return this.httpClient.delete(url);
  }
  retrieveCov(idCov: number): Observable<Covoiturage> {
    const url = `${this.baseUrl}/retreiveCov/${idCov}`;
    return this.httpClient.get<Covoiturage>(url);
  }
}
