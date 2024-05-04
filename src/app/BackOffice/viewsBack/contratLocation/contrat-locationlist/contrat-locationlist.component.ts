import { Component, OnInit } from '@angular/core';
import { Contratlocation } from 'src/app/Models/contratlocation';
import { ContratlocationService } from 'src/app/Services/contratlocation.service';

@Component({
  selector: 'app-contrat-locationlist',
  templateUrl: './contrat-locationlist.component.html',
  styleUrls: ['./contrat-locationlist.component.css']
})
export class ContratLocationlistComponent implements OnInit {
  contrats: Contratlocation[] = [];
  nomUtilisateur: string = 'fedi'; // Utilisateur par défaut, à remplacer par votre logique

  constructor(private contratLocationService: ContratlocationService) { }

  ngOnInit(): void {
    this.rechercherContrats();
  }

  rechercherContrats(): void {
    this.contratLocationService.getContratsByUser(this.nomUtilisateur)
      .subscribe(
        data => {
          this.contrats = data;
          console.log(this.contrats);
           // Pour déboguer, vous pouvez afficher les données dans la console
        },
        error => {
          console.log(error);
        }
      );
  }
}
