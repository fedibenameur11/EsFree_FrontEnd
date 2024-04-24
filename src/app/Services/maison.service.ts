import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Maison } from '../Models/maison';

@Injectable({
  providedIn: 'root'
})
export class MaisonService {

  private baseUrl : string = 'http://localhost:8079/maison';

  constructor(private http: HttpClient) { }
  findAllMaisons(): Observable<Maison[]>{
    return this.http.get<Maison[]>(this.baseUrl + '/list');
  }

  addMaison(maison : Maison): Observable<Maison>{
    return this.http.post<Maison>(this.baseUrl + '/addMaison',maison);
  }
  updateMaison(maison : Maison): Observable<Maison>{
    return this.http.put<Maison>(this.baseUrl + '/updateMaison',maison);
  }
  getMaisonById(maison_id: number): Observable<Maison> {
    return this.http.get<Maison>(`${this.baseUrl}/getMaison/${maison_id}`);
  }
  deleteMaison(maison_id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteMaison/${maison_id}`);
  }
}



























 /* updateUser(user : User): Observable<User>{
    return this.http.put<User>(this.baseUrl + '/updateUser',user);
  }
  saveUsers(users: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/save`, users);
  }
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/retrieveOneUser/${userId}`);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/removeUser/${userId}`);
  }


  //malekkk
  getProjectManagers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/projectmanagers');
  }
  // malekkk
  getEmployeesForTASKS(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/employees');
  }
// malekk
getCompetentUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl}/competentUsers`);
}

private baseUrlf : string = 'http://localhost:8082/user';

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrlf}/files/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrlf}/files`);
  }
  getFile(filename: string): Observable<HttpResponse<Blob>> {
    const url = `${this.baseUrlf}/files/${filename}`;
    return this.http.get(url, {
      responseType: 'blob',
      observe: 'response' // To access full response including headers
    });
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/email/${email}`);
  }*/

