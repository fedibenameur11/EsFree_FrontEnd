import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Services/event.service';
import {Event} from 'src/app/Models/event/event.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit{
  events: Event[] = [];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
    });
  }
  approveEvent(event: Event): void {
    this.eventService.approveEvent(event.idEvent).subscribe(
      () => {
        // Mettre à jour le statut de l'événement dans la liste des événements
        event.statut = 'Approuvé';
  
        // Afficher la notification de succès
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Event Approved Successfully !',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error', error);
      }
    );
  }
  rejectEvent(event: Event): void {
    this.eventService.rejectEvent(event.idEvent).subscribe(
      () => {
        // Mettre à jour le statut de l'événement dans la liste des événements
        event.statut = 'Rejeté';
  
        // Afficher la notification de succès
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Event Rejected Successfully !',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error', error);
      }
    );
  }
}
