import { Component } from '@angular/core';
import { EventService } from 'src/app/Services/event.service'; // Assurez-vous d'importer le service EventService
import { Event } from 'src/app/Models/event/event.model'; // Assurez-vous d'importer le modèle Event
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-add-front',
  templateUrl: './event-add-front.component.html',
  styleUrls: ['./event-add-front.component.css']
})
export class EventAddFrontComponent {
  event: Event = {} as Event; // Initialisation de l'objet eventData

  constructor(private eventService: EventService, private fireStorage:AngularFireStorage, private router:Router) {} // Injection du service EventService


  async onFileSelected(event:any){
    const file = event.target.files[0]
    if(file){
      const path = `yt/${file.name}`
      const uploadTask =await this.fireStorage.upload(path,file)
      const url = await uploadTask.ref.getDownloadURL()
      console.log(url)
      this.event.imageEvent=url;
    }
  }
  async submitEvent() {
   
    await this.eventService.addEvent(this.event, 1).subscribe(
      () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Event added Successfully !',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/myevents']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding event:', error);
      }
    );
    
  }
 
}