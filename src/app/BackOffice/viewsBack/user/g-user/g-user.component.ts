import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Modal/user';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-g-user',
  templateUrl: './g-user.component.html',
  styleUrls: ['./g-user.component.css']
})
export class GUserComponent implements OnInit {


  users: User[] | undefined;

  constructor (private userservice:UserService){}
  ngOnInit(): void {
    this.userservice.GetUsers().subscribe(users => {
      this.users = users;
      console.log(users);
      
    });

  
  }


  

}
