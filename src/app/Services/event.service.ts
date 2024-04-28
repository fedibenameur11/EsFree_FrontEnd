import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../Models/event/event.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl : String ="http://localhost:8082/Evenement";
  constructor(private httpClient : HttpClient) {}

  getApprovedListEvents(): Observable<Event[]> 
  {
    return this.httpClient.get<Event[]>(this.baseUrl +'/approvedEvents')
      
  }
  
 // Méthode pour envoyer les données du formulaire au serveur
 addEvent(event: Event, userName: string): Observable<any> {
  return this.httpClient.post<any>(`${this.baseUrl}/addEvent/${userName}`, event);
}
getEventById(idEvent: number): Observable<Event> {
  return this.httpClient.get<Event>(`${this.baseUrl}/getById/${idEvent}`);
}
getQRCodeUrl(idEvent: number): Observable<string> {
  return this.httpClient.get(`${this.baseUrl}/qrCode/${idEvent}`, { responseType: 'blob' })
    .pipe(
      map((blob: Blob) => URL.createObjectURL(blob))
    );
}
/*getEventsByDate(date: Date): Observable<Event[]> {
  // Convertir la date en format ISO pour l'envoyer dans la requête HTTP
  const isoDate = date.toISOString().split('T')[0]; // Convertir en format 'YYYY-MM-DD'
  return this.httpClient.get<Event[]>(`${this.baseUrl}/findByDateDebutEvent/${isoDate}`);
}*/
getAllEvents(): Observable<Event[]> 
{
  return this.httpClient.get<Event[]>(this.baseUrl +'/EventController')
}
approveEvent(idEvent: number): Observable<Event> {
  return this.httpClient.put<Event>(`${this.baseUrl}/approveEvent/${idEvent}`, {});
}
rejectEvent(idEvent: number): Observable<Event> {
  return this.httpClient.put<Event>(`${this.baseUrl}/rejectEvent/${idEvent}`, {});
}

getEventsByUser(userName: string): Observable<Event[]> {
  return this.httpClient.get<Event[]>(`${this.baseUrl}/getEventsUser/${userName}`);
}
updateEvent(idEvent: number, updatedEvent: Event): Observable<Event> {
  return this.httpClient.put<Event>(`${this.baseUrl}/updateEvent/${idEvent}`, updatedEvent);
}
deleteEvent(idEvent: number): Observable<Event> {
  return this.httpClient.delete<Event>(`${this.baseUrl}/DeleteById/${idEvent}`, {});
}
}
