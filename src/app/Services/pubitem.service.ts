import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PubItem } from '../Models/pubitem';

@Injectable({
  providedIn: 'root'
})
export class PubitemService {
  private baseUrl : String ="http://localhost:8082/pubitem/";
  private staticUserId = 1;
  constructor(private httpClient : HttpClient) { }

  getPubitems(): Observable<PubItem[]> 
  {
    return this.httpClient.get<PubItem[]>(this.baseUrl +'retrieveAllPub')
      
  }


  deletePubitem(id: number): Observable<void> {
    const url = `${this.baseUrl}removePub/${id}`;
    return this.httpClient.delete<void>(url);
  }

  addPubitem(pubItem: PubItem): Observable<PubItem> {
    return this.httpClient.post<PubItem>(`${this.baseUrl}addPub`, pubItem);
  }

  updatePubItem(pubItem: PubItem): Observable<PubItem> {
    return this.httpClient.post<PubItem>(`${this.baseUrl}updatePub`, pubItem);
  }

  searchPubItems(keyword: string): Observable<PubItem[]> {
      return this.httpClient.get<PubItem[]>(`${this.baseUrl}searchPubItems?keyword=${keyword}`);
    }


    addPubItemm(pubItem: PubItem): Observable<PubItem> {
      return this.httpClient.post<PubItem>(`${this.baseUrl}addPubItemm`, pubItem, {
        params: { id: this.staticUserId.toString() }
      });
    }
}
