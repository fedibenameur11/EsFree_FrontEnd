import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BadWordService {
  private readonly API_KEY = '93cef6edffmsh2751f29bb1dfe4fp15f8d2jsn737a6305b7f0';
  constructor() { }

  checkForBadWord(content: string): Observable<any> {
    const encodedParams = new URLSearchParams();
    encodedParams.set('content', content);
   

    const options = {
      method: 'POST',
      url: 'https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': this.API_KEY,
        'X-RapidAPI-Host': 'neutrinoapi-bad-word-filter.p.rapidapi.com'
      },
      data: encodedParams
    };

    return new Observable((observer) => {
      axios.request(options)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }}