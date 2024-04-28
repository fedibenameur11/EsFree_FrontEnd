import { Component, OnInit } from '@angular/core';
import { Participation } from 'src/app/Models/participation/participation.model';
import { ParticipationService } from 'src/app/Services/participation.service';
@Component({
  selector: 'app-participation-list-front',
  templateUrl: './participation-list-front.component.html',
  styleUrls: ['./participation-list-front.component.css']
})
export class ParticipationListFrontComponent implements OnInit{
  participations: Participation[] = [];
  //userName!: String;

  constructor(private participationService: ParticipationService) { }

  ngOnInit(): void {
   // this.getParticipationsByUser(this.userName); 
    this.getParticipationsByUser('mehdi'); // Remplacez 'username' par le nom d'utilisateur approprié
  }

  getParticipationsByUser(userName: string): void {
    this.participationService.getParticipationsByUser(userName)
      .subscribe(
        (participations: Participation[]) => {
          this.participations = participations;
        },
        (error) => {
          console.error('Error fetching user participations:', error);
        }
      );
  }
  editParticipation(participation: Participation){}
  deleteParticipation(idParticipation: number){}

}
