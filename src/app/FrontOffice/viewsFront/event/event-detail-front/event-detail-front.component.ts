import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Services/event.service';
import { Event } from 'src/app/Models/event/event.model';

@Component({
  selector: 'app-event-detail-front',
  templateUrl: './event-detail-front.component.html',
  styleUrls: ['./event-detail-front.component.css']
})
export class EventDetailFrontComponent implements OnInit {
  idEvent!: number;
  event: Event = {} as Event;
  qrCodeUrl: string | undefined;

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idEvent = +params['idEvent']; // Récupère l'ID de l'événement depuis l'URL
      this.getEventDetails(this.idEvent);
    });
  }

  getEventDetails(idEvent: number): void {
    this.eventService.getEventById(idEvent).subscribe((data: Event) => {
      this.event = data;
      // Appel pour récupérer le lien du QR code
      this.eventService.getQRCodeUrl(idEvent).subscribe((qrCodeUrl: string) => {
        this.qrCodeUrl = qrCodeUrl;
      });
    });
  }

}
