import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../Modal/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public $refreshToken = new Subject<boolean>;
  public $refreshTokenReceived = new Subject<boolean>;

  constructor(private http: HttpClient) { 
    this.$refreshToken.subscribe((res:any)=> {
   this.getRefreshToken()
 })
  }

  
  onLogin(obj: any)   {
    return this.http.post("http://localhost:8082/auth/signin", obj)
   
    
  }
  
  GetUsers(): Observable<User[]>{
    return this.http.get<User[]>("http://localhost:8082/admin/getUsers")
  }

  getRefreshToken()   {
    debugger;
    let loggedUserData : any;
    const localData =   localStorage.getItem('token');
    if(localData != null) {
      loggedUserData =  JSON.parse(localData);
    }
    const obj = {
    
      "refreshToken": loggedUserData
    };
    this.http.post("http://localhost:8082/auth/refresh", obj).subscribe((Res:any)=>{
      localStorage.setItem('token', JSON.stringify(Res.data));
      this.$refreshTokenReceived.next(true);
    })
  }
}
