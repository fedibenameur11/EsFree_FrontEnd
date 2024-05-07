import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Raba3 } from 'src/app/Models/raba3';
import { Raba3Service } from 'src/app/Services/raba3.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/messaging';



@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit{
  idJeux!: number
  newSession: Raba3 = new Raba3(); 
  showAddDialog: boolean = false;
  raba3: Raba3 = new Raba3();

  openAddDialog() {
    this.showAddDialog = true;
  }

  closeAddDialog() {
    this.showAddDialog = false;
  }
  
  constructor(private afMessaging: AngularFireMessaging,private act:ActivatedRoute,private raba3Service:Raba3Service , private router: Router,private dialog :MatDialog){ }
  public sessions: Array<Raba3> =[];


  ngOnInit(): void {
    this.act.paramMap.subscribe(params => {
      this.idJeux = this.act.snapshot.params['idJeux']
    });

    this.getListSessions(this.idJeux);
    
  }


  getListSessions(idJeux: number): void {
    this.raba3Service.getListSessions(idJeux).subscribe(
      (d: Raba3[]) => {
        this.sessions = d.map(session => {
          // Convert the dateDebut property to a Date object
          session.dateDebut = new Date(session.dateDebut);
          return session;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

    getNumberArray(count: number): number[] {
      return Array.from({ length: count }, (_, i) => i + 1);
    }

    

    addGameSessionAndAssignToGame(): void {
      const staticUserId = 4; // Static user ID value

      this.raba3Service.addGameSessionAndAssignToGameAndUser(this.newSession, this.idJeux, staticUserId)
        .subscribe(response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Game Session added Successfully !',
            showConfirmButton: false,
            timer: 1500})
          this.showAddDialog = false;
          window.location.reload();
        });


    }
    shareOnFacebook() {
      const urlToShare = 'https://virtiverse.com'; // URL to share
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
      window.open(facebookShareUrl, 'join us in this game session !!');
    }

    getTimeUntilStart(startDate: Date): { hours: number, minutes: number } {
      // Get the current time
      const currentTime = new Date();
      
      // Calculate the difference in milliseconds between the start date and the current time
      const timeDifference = startDate.getTime() - currentTime.getTime();
      
      // Convert milliseconds to minutes
      const minutesDifference = Math.floor(timeDifference / (1000 * 60));
      
      // Calculate the remaining hours and minutes
      const hours = Math.floor(minutesDifference / 60);
      const remainingMinutes = minutesDifference % 60;
    
      // Return an object containing the hours and minutes
      return { hours, minutes: remainingMinutes };
    }


    sendNotification(): void {
      this.afMessaging.requestToken.pipe(take(1)).subscribe(
        token => {
          // Send notification using token
          this.sendNotificationToToken(token);
        },
        error => {
          console.error('Error requesting token:', error);
        }
      );
    }
  
    private sendNotificationToToken(token: string): void {
      // Replace with your notification payload
      const notificationPayload = {
        token,
        to : "eIpYA7Puv0NqXUTIKlKwcf:APA91bFfj5CbK_eEbIH7Xplnz8qPtLjt8k_f3tlgt4m2c-0OMzrlnJAbuwIIZLJzBpbi4r8zTKYwFJZsC0NyU2B1EqxL-yeS-3yvVQv0Bm9Wx1R8WNQU_zu7Y3MKUR4G8z2iE9gXsBZQ",
        notification: {
        title : "Game Session",
        body : "A user joined your session",
        icon : "https://i.ibb.co/zWgfqtD/430112506-957916262375552-2785303533872510482-n.jpg"
        }
      };
  
      // Send notification to the device with the specified token
      // Replace 'YOUR_SERVER_KEY' with your Firebase Cloud Messaging Server Key
      fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'key=AAAAVhaWNgw:APA91bFggg2WnoXuzUZP5SyCgYF3G8xi4j455wRoz5-rPOulMWDTonUiJAMsnyvDHFAJlyt376rm59HBbudITMBtMYm7_OWec8gf2lXnbbuRBHRxscA53XB7MJN_NiZp3mmOolQbrjzF' // Replace with your Firebase Cloud Messaging Server Key
        },
        body: JSON.stringify(notificationPayload)
      })
      .then(response => {
        console.log('Notification sent successfully:', response);
        // Add visual feedback for successful notification
      })
      .catch(error => {
        console.error('Error sending notification:', error);
        // Add visual feedback for failed notification
      });
    }
  }
    