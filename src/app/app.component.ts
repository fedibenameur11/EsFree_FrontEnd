import { Component, OnInit } from '@angular/core';
import {getMessaging, getToken} from 'firebase/messaging';
import { from } from 'rxjs';
import { environment } from 'src/environements/environement';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  ngOnInit(): void {
this.requestPersmission(); }


  title = 'virtiverseFrontEnd';


  requestPersmission(){
    const messaging = getMessaging();
    getToken(messaging,{vapidKey:environment.firebase.vpaidKey}).then(
      (currentToken)=>{
        if(currentToken){
          console.log("yeah");
          console.log(currentToken);
        }else{
          console.log("we have a problem");
        }
      })
    
  }

}
