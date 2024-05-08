import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent {
  constructor(private router :Router ){}
  

logOut() {
 
    localStorage.removeItem('token');
    localStorage.removeItem('angular17TokenUserId');
    localStorage.removeItem('angular17TokenEmail');
    localStorage.removeItem('name');
    localStorage.removeItem('image');
    localStorage.removeItem('role');
 // Redirect to login page
 this.router.navigate(['']);
}


}
