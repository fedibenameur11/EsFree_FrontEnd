import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Maison } from '../Models/maison';
import { User } from '../Models/user';

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
  addMaisonByUser(maison: Maison, nom: string): Observable<Maison> {
    return this.http.post<Maison>(`${this.baseUrl}/addMaisonbyuser?nom=${nom}`, maison);
  }
  
  updateMaison(maison : Maison,): Observable<Maison>{
    return this.http.put<Maison>(`${this.baseUrl}/updateMaison/${maison.id_maison}`, maison);

  }

  getMaisonById(maison_id: number): Observable<Maison> {
    return this.http.get<Maison>(`${this.baseUrl}/getMaison/${maison_id}`);
  }
  deleteMaison(maison_id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteMaison/${maison_id}`);   
  }
  getMaisonsByUtilisateur(utilisateurnom: String): Observable<Maison[]> {
    return this.http.get<Maison[]>(`${this.baseUrl}/utilisateurs/${utilisateurnom}/maisons`);
  }

  ajouterDemandeur(maisonId: number, demandeur: User): Observable<Maison> {
    return this.http.post<Maison>(`${this.baseUrl}/${maisonId}/demandeur`, demandeur);
  }
  supprimerDemandeur(maisonId: number, nom_demandeur: String): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${maisonId}/demandeurs/${nom_demandeur}`);
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

