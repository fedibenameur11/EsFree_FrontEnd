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
  searchTerm: string = '';
  filteredEvents: Event[] = [];
  searchDate: string = '';

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getApprovedListEvents().subscribe(events => {
      this.events = events;
      this.filteredEvents = events;
    });
  }
  searchEvents(): void {
    if (this.searchTerm.trim()) {
      this.eventService.searchEventsByOrganisateur(this.searchTerm).subscribe(events => {
        this.events = events;
      });
    } else {
      // Si le champ de recherche est vide, rechargez la liste complète des événements approuvés
      this.eventService.getApprovedListEvents().subscribe(events => {
        this.events = events;
      });
    }
  }
  filterEventsByDate(): void {
    if (this.searchDate) {
      const searchDateObj = new Date(this.searchDate);
      const formattedDate = searchDateObj.toISOString().split('T')[0];
      this.eventService.findByDateDebutEvent(formattedDate).subscribe(events => {
        // Mettez à jour this.events avec les événements filtrés par date
        this.events = events;
        this.filteredEvents = events;
      });
    } else {
      // Si aucune date n'est saisie, réinitialisez les événements filtrés avec tous les événements
      this.filteredEvents = this.events;
    }
  }
  resetFilters(): void {
    this.eventService.getApprovedListEvents().subscribe(events => {
      this.events = events;
      this.filteredEvents = events;
    });
}
  navigateToEventDetail(idEvent: number) {
    this.router.navigate(['/eventdetail', idEvent]); // Redirige vers la page event-detail avec l'ID de l'événement en tant que paramètre
  }
  addevent(): void {
    this.router.navigateByUrl('/addevent');
  }

 

}
