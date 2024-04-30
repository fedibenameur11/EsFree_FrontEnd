import { Component } from '@angular/core';
import { Participation } from 'src/app/Models/participation/participation.model';
import { ParticipationService } from 'src/app/Services/participation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participation-list',
  templateUrl: './participation-list.component.html',
  styleUrls: ['./participation-list.component.css']
})
export class ParticipationListComponent {
  participations: Participation[] = [];

  constructor(private participationService: ParticipationService, private router: Router) {}

  ngOnInit(): void {
    this.participationService.retrieveAllParticipations().subscribe(participations => {
      this.participations = participations;
    });
  }
}
