import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Modal/user';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
openUpdateModal(arg0: User|undefined) {
throw new Error('Method not implemented.');
}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('angular17TokenUserId');
    localStorage.removeItem('angular17TokenEmail');
  
    // Redirect to login page
    this.router.navigate(['/login']);
  }
  user: User | undefined ;

  constructor( private userservice:UserService , private router :Router) {}
  ngOnInit(): void {
   this.getusers() ;
  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const userId = localStorage.getItem('angular17TokenUserId');
      if (userId !== null) { // Check if userId is not null
        this.uploadImage(file, parseFloat(userId));
        location.reload();
      
        
      } else {
        console.error('User ID not found in local storage');
      }
    }
  }

  uploadImage(image: File , id :number) {
    this.userservice.uploadImage(image , id).subscribe(
      (data: any) => {
        this.user = data.user; // Assuming the response contains updated user details
        localStorage.setItem('image', data.image);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  getusers(){
    const userId = localStorage.getItem('angular17TokenUserId'); // Retrieve user ID from local storage



    console.log("assleemaa ");
    console.log(userId);
    
    
    if (userId) {
      this.userservice.GetUser(parseFloat(userId)).subscribe(
        (data: User) => {
          this.user = data;
          console.log(this.user);
          
        },
        (error) => {
          console.error(error);
        }
      );
       // Fetch user details using retrieved user ID
    } else {
      console.error('User ID not found in local storage');
    }
  }
  
  


}
