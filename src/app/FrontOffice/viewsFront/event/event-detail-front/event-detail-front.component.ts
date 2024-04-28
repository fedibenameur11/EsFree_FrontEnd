import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Services/event.service';
import { Event } from 'src/app/Models/event/event.model';
import { ParticipationService } from 'src/app/Services/participation.service';

import Swal from 'sweetalert2';
import { Participation } from 'src/app/Models/participation/participation.model';
declare var $: any;
@Component({
  selector: 'app-event-detail-front',
  templateUrl: './event-detail-front.component.html',
  styleUrls: ['./event-detail-front.component.css']
})
export class EventDetailFrontComponent implements OnInit {
  idEvent!: number;
  event: Event = {} as Event;
  qrCodeUrl: string | undefined;

  constructor(private route: ActivatedRoute, private eventService: EventService, private participationService: ParticipationService) { }

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
  openParticipationModal(): void {
    $('#participationModal').modal('show');
  }

  participation: Participation = {} as Participation;
  submitParticipationForm(): void {
   // const idEvent = 4;
    const userName = "mehdi";
    if (this.idEvent && userName) {
        this.participationService.addParticipation(this.participation, this.idEvent, userName).subscribe(response => {
            // Gérer la réponse de la requête
            console.log('Participation added successfully:', response);
            // Fermer la modal
            $('#participationModal').modal('hide');
        }, error => {
            // Gérer les erreurs de la requête
            console.error('Error adding participation:', error);
        });
    }
}

}
