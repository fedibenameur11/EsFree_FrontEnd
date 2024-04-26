import { Component } from '@angular/core';
import { EventService } from 'src/app/Services/event.service'; // Assurez-vous d'importer le service EventService
import { Event } from 'src/app/Models/event/event.model'; // Assurez-vous d'importer le modèle Event
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-event-add-front',
  templateUrl: './event-add-front.component.html',
  styleUrls: ['./event-add-front.component.css']
})
export class EventAddFrontComponent {
  event: Event = {} as Event; // Initialisation de l'objet eventData

  constructor(private eventService: EventService) {} // Injection du service EventService
  submitEvent() {
   
    this.eventService.addEvent(this.event, 'yasmine').subscribe(
      () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Event added Successfully !',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding event:', error);
      }
    );
  }
}