import { Component,ElementRef, ViewChild  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Maison } from 'src/app/Models/maison';
import { MaisonService } from 'src/app/Services/maison.service';
import { MatDialog } from '@angular/material/dialog';

import * as L from 'leaflet';
import { CoordinatesMapService } from 'src/app/Services/coordinates-map.service';

@Component({
  selector: 'app-maisonlist',
  templateUrl: './maisonlist.component.html',
  styleUrls: ['./maisonlist.component.css']
})
export class MaisonlistbackComponent {
  maison : Maison[]=[]
  affiche_add: boolean = false;
  affiche_modif : boolean = false;
  newMaison: Maison = new Maison(); 
  showAddDialog: boolean = false;
  showUpdateDialog: boolean = false;
  showAddContratDialog: boolean = false;
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  DEFAULT_LATITUDE = 36.8065; // Coordonnées approximatives de Tunis, Tunisie
  DEFAULT_LONGITUDE = 10.1815;
  map: any;
  loc!:string;
  openAddDialog() {
    this.showAddDialog = true;
    this.initMap();
  }
  openAddContratDialog() {
    this.showAddContratDialog = true;
  }
  openUpdateDialog() {
    this.showUpdateDialog = true;
  }

  closeAddDialog() {
    this.showAddDialog = false;
  }
  closeUpdateDialog() {
    this.showUpdateDialog = false;
  }
  constructor(private maisonService: MaisonService, private router: Router,private dialog :MatDialog,private MapService:CoordinatesMapService) {
    this.newMaison.user = {
      id: 1,
      name: 'fedi',
      email: 'fedi.benameur@esprit.tn',
      password: 'fedi',
      image :'',
      phoneNumber : 93661180,
      role :'colocataire'
    };
  }
  ngOnInit() {
    this.getMaisonsByUtilisateur(1);
  }
  getMaisonsByUtilisateur(iduser: number) {
    this.maisonService.getMaisonsByUtilisateur(iduser)
      .subscribe(maison => this.maison = maison);
  }
  
  listMaisons(){
    this.maisonService.findAllMaisons().subscribe(
      maison => {
        this.maison =maison     
      }
    );
  }
  onSubmit(): void {
    this.maisonService.addMaisonByUser(this.newMaison,this.newMaison.user.id).subscribe(() => {
      console.log('Nouvelle maison a été ajouté', this.newMaison);
      this.showAddDialog = false;
      
    });
    window.location.reload();
  }

  onModalUpdateOpen(maisonId: number): void {
    this.openUpdateDialog();
    this.maisonService.getMaisonById(maisonId).subscribe((maison: Maison) => {
      this.newMaison = maison;   
      
    });
  }
  onSubmitUpdate(): void {
    
    this.maisonService.updateMaison(this.newMaison).subscribe(() => {
      console.log('Nouvelle maison a été ajouté', this.newMaison);

    });
    console.log('La maison a été modifié', this.newMaison);
    //window.location.reload();
  }

  deleteMaison(idMaison: number): void {
    this.maisonService.deleteMaison(idMaison).subscribe(() => {
      console.log("Maison supprimé avec succés");
    }, (error) => {
      console.log("Echec dans la suppression de cette maison ");
    });
    window.location.reload();
  }

  initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  
}
