import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Services/event.service';
import { Event } from 'src/app/Models/event/event.model';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})
export class EventCalendarComponent implements OnInit{
  events: Event[] = [];
selectedDateEvents: any;
daysInMonth: any;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    // Appeler la méthode pour récupérer les événements par date (exemple: 2024-04-15)
    const currentDate = new Date(); // Exemple de date au format ISO
    this.getEventsByDate(currentDate);
  }
  getEventsByDate(date: Date): void {
    this.eventService.getEventsByDate(date).subscribe((data: Event[]) => {
      this.events = data;
    });
  }

}
