import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserUpdateData } from 'src/app/Modal/UserUpdateData';
import { UserS, role } from 'src/app/Modal/userS';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-g-user',
  templateUrl: './g-user.component.html',
  styleUrls: ['./g-user.component.css']
})
export class GUserComponent implements OnInit {

  deleteUser(userId: number) {
  this.userservice.deleteUser(userId).subscribe(
    (data) => {
      // Update the user list after successful deletion
      location.reload ;
      console.log('User deleted successfully:', data);
      this.route.navigate(['/users'])
    },
    (error) => {
      console.error('Error deleting user:', error);
    }
  );
}
addUser() {
  if (this.file !== undefined) {
    const userData = new UserUpdateData(this.user); // Create UserUpdateData object with necessary properties
    this.userservice.addUser(userData, this.file).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        // Perform any additional actions after updating user
        this.route.navigate(['/users'])
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  } else {
    console.error('No file selected.');
    // Optionally, you can display a message to the user indicating that no file was selected
  }
}

  file: File | undefined;
click: any;

onFileSelected(event: any) {
 this.file = event.target.files[0];
}

onEtatChange(event: any) {

  const newValue = event?.target?.values;
    if (newValue !== undefined) {
      this.user.role = newValue;
    
  }
}
updateUser(): void {
  if (this.file !== undefined) {
    const userData = new UserUpdateData(this.user); // Create UserUpdateData object with necessary properties
    this.userservice.updateUser(userData, this.file).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        this.route.navigate([('/users')])
        // Perform any additional actions after updating user
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  } else {
    console.error('No file selected.');
    // Optionally, you can display a message to the user indicating that no file was selected
  }
}


etatOptions = Object.values(role);
user : UserS = new UserS();
  users: UserS[] | undefined;
  selectedEtat!: role;
 


  constructor (private userservice:UserService , private route :Router){}
  
  ngOnInit(): void {


 this.loaduser(); 
  }

  loaduser(): void {
    this.userservice.GetUsers().subscribe(
      (data) => {
        this.users = data;
        
        console.log(this.users);
        
        
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  

  openUpdateModal(user: UserS) {
    console.log('Selected user:', user);
    this.user = new UserS(); // Create a new instance
    Object.assign(this.user, user); // Copy properties from selected pubItem
   
  }

  

}
