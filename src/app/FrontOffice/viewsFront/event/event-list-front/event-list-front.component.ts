import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Services/event.service';
import {Event} from 'src/app/Models/event/event.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-event-list-front',
  templateUrl: './event-list-front.component.html',
  styleUrls: ['./event-list-front.component.css']
})
export class EventListFrontComponent implements OnInit  {
  events: Event[] = [];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getApprovedListEvents().subscribe(events => {
      this.events = events;
    });
  }
  navigateToEventDetail(idEvent: number) {
    this.router.navigate(['/eventdetail', idEvent]); // Redirige vers la page event-detail avec l'ID de l'événement en tant que paramètre
  }
  addevent(): void {
    this.router.navigateByUrl('/addevent');
  }

}
